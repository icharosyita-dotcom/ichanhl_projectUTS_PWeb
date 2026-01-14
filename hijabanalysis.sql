-- Database: hijabanalysis
CREATE DATABASE IF NOT EXISTS hijabanalysis;
USE hijabanalysis;

-- Tabel dataset (untuk referensi rekomendasi)
CREATE TABLE IF NOT EXISTS skin_dataset (
    id INT AUTO_INCREMENT PRIMARY KEY,
    no INT NOT NULL,
    r INT NOT NULL,
    g INT NOT NULL,
    b INT NOT NULL,
    undertone VARCHAR(50) NOT NULL,
    gelap VARCHAR(100) NOT NULL,
    pastel VARCHAR(100) NOT NULL,
    percoklatan VARCHAR(100) NOT NULL,
    gelapHex VARCHAR(7) NOT NULL,
    pastelHex VARCHAR(7) NOT NULL,
    percoklatanHex VARCHAR(7) NOT NULL
);

-- Isi data awal
INSERT INTO skin_dataset (no, r, g, b, undertone, gelap, pastel, percoklatan, gelapHex, pastelHex, percoklatanHex) VALUES
(1, 210, 160, 140, 'Warm', 'Maroon', 'Peach', 'Caramel', '#800000', '#FFDAB9', '#D2691E'),
(2, 200, 150, 120, 'Warm', 'Olive', 'Soft Coral', 'Honey Brown', '#808000', '#FF7F50', '#D2691E'),
(3, 120, 140, 190, 'Cool', 'Navy', 'Lavender', 'Taupe', '#000080', '#E6E6FA', '#483C32'),
(4, 130, 150, 200, 'Cool', 'Plum', 'Baby Blue', 'Rosewood', '#8B008B', '#87CEEB', '#65000B'),
(5, 170, 165, 160, 'Neutral', 'Burgundy', 'Beige', 'Mocha', '#800020', '#F5F5DC', '#8B4513'),
(6, 180, 175, 170, 'Neutral', 'Charcoal', 'Dusty Pink', 'Coffee', '#36454F', '#DCC0BA', '#6F4E37'),
(7, 220, 170, 150, 'Warm', 'Dark Brown', 'Soft Coral', 'Caramel', '#654321', '#FF7F50', '#D2691E'),
(8, 100, 120, 180, 'Cool', 'Emerald', 'Soft Pink', 'Dusty Mauve', '#004D00', '#FFB6C1', '#8B7D6B'),
(9, 165, 160, 155, 'Neutral', 'Dark Teal', 'Mint Green', 'Sandstone', '#008080', '#98FB98', '#A0522D'),
(10, 135, 155, 195, 'Cool', 'Navy', 'Lavender', 'Taupe', '#000080', '#E6E6FA', '#483C32'),
(11, 205, 155, 135, 'Warm', 'Terracotta', 'Peach', 'Bronze', '#E2725B', '#FFDAB9', '#CD7F32'),
(12, 110, 130, 185, 'Cool', 'Sapphire', 'Lilac', 'Mauve', '#0F52BA', '#C8A2C8', '#E0B0FF'),
(13, 175, 170, 165, 'Neutral', 'Mocha', 'Cream', 'Hazelnut', '#8B4513', '#FFFDD0', '#8E7618'),
(14, 215, 165, 145, 'Warm', 'Chocolate', 'Coral', 'Camel', '#D2691E', '#FF7F50', '#C19A6B'),
(15, 125, 145, 200, 'Cool', 'Indigo', 'Sky Blue', 'Rosewood', '#4B0082', '#87CEEB', '#65000B'),
(16, 185, 180, 175, 'Neutral', 'Charcoal', 'Dusty Pink', 'Cocoa', '#36454F', '#DCC0BA', '#D2691E'),
(17, 195, 145, 125, 'Warm', 'Brick Red', 'Salmon', 'Cinnamon', '#B22222', '#FA8072', '#D2691E'),
(18, 115, 135, 190, 'Cool', 'Teal', 'Baby Blue', 'Ash Brown', '#008080', '#87CEEB', '#8B4513'),
(19, 168, 163, 158, 'Neutral', 'Burgundy', 'Cream', 'Mocha', '#800020', '#FFFDD0', '#8B4513'),
(20, 225, 175, 150, 'Warm', 'Brown', 'Peach', 'Sandalwood', '#A0522D', '#FFDAB9', '#F4A460');

-- Tabel cart (untuk simpan keranjang belanja di database)
CREATE TABLE IF NOT EXISTS cart (
    id VARCHAR(50) PRIMARY KEY,
    colorName VARCHAR(100),
    category VARCHAR(100),
    hexColor VARCHAR(7)
);
