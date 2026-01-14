import math
from dataset import SKIN_DATASET

def classify_undertone(r, g, b):
    """C4.5 Decision Tree sederhana untuk klasifikasi undertone berdasarkan proporsi RGB"""
    if r > g and r > b:
        if r - b > 40:
            return 'Warm'
        elif r - b > 20:
            return 'Neutral'
        else:
            return 'Neutral'
    elif b > r and b > g:
        if b - r > 15:
            return 'Cool'
        else:
            return 'Neutral'
    else:
        return 'Neutral'

def find_closest_match(r, g, b, undertone):
    """Mencari data yang paling mirip dari dataset berdasarkan Euclidean distance"""
    same_undertone = [entry for entry in SKIN_DATASET if entry['undertone'] == undertone]
    if not same_undertone:
        same_undertone = SKIN_DATASET
    
    closest_match = same_undertone[0]
    min_distance = float('inf')
    for entry in same_undertone:
        distance = math.sqrt((entry['r'] - r)**2 + (entry['g'] - g)**2 + (entry['b'] - b)**2)
        if distance < min_distance:
            min_distance = distance
            closest_match = entry
    return closest_match

def get_recommendations(match):
    """Mengambil 3 rekomendasi hijab (Gelap, Pastel, Cokelat)"""
    return [
        {'id': f"{match['no']}-dark", 'colorName': match['gelap'], 'category': 'Dark', 'hexColor': match['gelapHex']},
        {'id': f"{match['no']}-pastel", 'colorName': match['pastel'], 'category': 'Pastel', 'hexColor': match['pastelHex']},
        {'id': f"{match['no']}-brown", 'colorName': match['percoklatan'], 'category': 'Brown Tones', 'hexColor': match['percoklatanHex']}
    ]