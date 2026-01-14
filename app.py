from flask import Flask, render_template, jsonify, request
from flask_cors import CORS
from flask_sqlalchemy import SQLAlchemy
from skin_analysis import classify_undertone, find_closest_match, get_recommendations
import os

app = Flask(__name__)
CORS(app)

# Koneksi ke Database MySQL Laragon
# Username default: root, Password default: (kosong)
app.config['SQLALCHEMY_DATABASE_URI'] = 'mysql+pymysql://root:@localhost/hijabanalysis'
app.config['SQLALCHEMY_TRACK_MODIFICATIONS'] = False

db = SQLAlchemy(app)

# Model Database
class SkinDataset(db.Model):
    id = db.Column(db.Integer, primary_key=True)
    no = db.Column(db.Integer)
    r = db.Column(db.Integer)
    g = db.Column(db.Integer)
    b = db.Column(db.Integer)
    undertone = db.Column(db.String(50))
    gelap = db.Column(db.String(100))
    pastel = db.Column(db.String(100))
    percoklatan = db.Column(db.String(100))
    gelapHex = db.Column(db.String(7))
    pastelHex = db.Column(db.String(7))
    percoklatanHex = db.Column(db.String(7))

class Cart(db.Model):
    id = db.Column(db.String(50), primary_key=True)
    colorName = db.Column(db.String(100))
    category = db.Column(db.String(100))
    hexColor = db.Column(db.String(7))

class AnalysisResult(db.Model):
    id = db.Column(db.Integer, primary_key=True)
    r = db.Column(db.Integer)
    g = db.Column(db.Integer)
    b = db.Column(db.Integer)
    undertone = db.Column(db.String(50))
    timestamp = db.Column(db.DateTime, server_default=db.func.now())

@app.route('/')
def index():
    # Pastikan file ada
    if not os.path.exists('templates/index.html'):
        return "Error: templates/index.html not found. Please make sure the file is in the 'templates' folder.", 404
    return render_template('index.html')

@app.route('/api/analyze', methods=['POST'])
def analyze():
    try:
        data = request.json
        avg_r = data.get('r')
        avg_g = data.get('g')
        avg_b = data.get('b')
        undertone = classify_undertone(avg_r, avg_g, avg_b)
        
        # Ambil data dari database
        try:
            dataset_from_db = SkinDataset.query.all()
        except:
            dataset_from_db = []

        if not dataset_from_db:
            from dataset import SKIN_DATASET
            match = find_closest_match(avg_r, avg_g, avg_b, undertone)
        else:
            # Cari yang terdekat dari data DB
            import math
            same_undertone = [d for d in dataset_from_db if d.undertone == undertone]
            if not same_undertone:
                from dataset import SKIN_DATASET
                match = find_closest_match(avg_r, avg_g, avg_b, undertone)
            else:
                closest = same_undertone[0]
                min_dist = float('inf')
                for d in same_undertone:
                    dist = math.sqrt((d.r - avg_r)**2 + (d.g - avg_g)**2 + (d.b - avg_b)**2)
                    if dist < min_dist:
                        min_dist = dist
                        closest = d
                match = {
                    'no': closest.no, 'undertone': closest.undertone,
                    'gelap': closest.gelap, 'pastel': closest.pastel, 'percoklatan': closest.percoklatan,
                    'gelapHex': closest.gelapHex, 'pastelHex': closest.pastelHex, 'percoklatanHex': closest.percoklatanHex
                }
            
        recommendations = get_recommendations(match)
        
        # Simpan hasil analisis ke database
        try:
            new_result = AnalysisResult(r=avg_r, g=avg_g, b=avg_b, undertone=undertone)
            db.session.add(new_result)
            db.session.commit()
        except Exception as e:
            print(f"Error saving analysis result: {e}")
            
        return jsonify({'undertone': undertone, 'colorMatch': match, 'recommendations': recommendations})
    except Exception as e:
        return jsonify({'error': str(e)}), 400

@app.route('/api/cart', methods=['GET', 'POST', 'DELETE'])
def manage_cart():
    try:
        if request.method == 'GET':
            items = Cart.query.all()
            return jsonify([{'id': i.id, 'colorName': i.colorName, 'category': i.category, 'hexColor': i.hexColor} for i in items])
        elif request.method == 'POST':
            item = request.json
            print(f"Received cart item: {item}")
            # Validasi data
            if not item or 'id' not in item:
                return jsonify({'error': 'Data tidak lengkap'}), 400
                
            exists = Cart.query.get(item['id'])
            if not exists:
                new_item = Cart(id=item['id'], colorName=item['colorName'], category=item['category'], hexColor=item['hexColor'])
                db.session.add(new_item)
                db.session.commit()
                print("Item added to cart")
            return jsonify({'success': True})
        elif request.method == 'DELETE':
            item_id = request.json.get('id')
            Cart.query.filter_by(id=item_id).delete()
            db.session.commit()
            return jsonify({'success': True})
    except Exception as e:
        print(f"Cart error: {e}")
        db.session.rollback()
        if request.method == 'GET':
            return jsonify([])
        return jsonify({'error': str(e)}), 400
    return jsonify({'error': 'Invalid request'}), 400

@app.route('/api/checkout', methods=['POST'])
def checkout():
    try:
        Cart.query.delete()
        db.session.commit()
    except:
        pass
    return jsonify({'success': True, 'shopeeUrl': 'https://shopee.co.id/search?keyword=hijab'})

if __name__ == '__main__':
    # Pastikan tabel terbuat (untuk local development jika perlu)
    # Dengan Laragon, biasanya tabel dibuat manual via SQL import
    app.run(debug=True, host='0.0.0.0', port=5000)
