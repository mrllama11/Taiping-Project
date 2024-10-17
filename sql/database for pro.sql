-- store information about vehicle categories

-- CREATE TABLE Vehicle_Category (
-- 	id INT PRIMARY KEY AUTO_INCREMENT,
--     category_name VARCHAR(255), kategori 1 2 3 4 5 
--     vehicle_type VARCHAR(255), bus non motor motor truk 
--     vehicle_cover_min VARCHAR(255), 0
--     vehicle_cover_max VARCHAR(255) 5 miliyar
--     
-- );

-- SELECT * FROM vehicle_category;

-- INSERT INTO vehicle_category (category_name, vehicle_type, vehicle_cover_min, vehicle_cover_max) VALUES
-- ('kategori 1', 'Non Bus & Non Truk', 0, 125000000),
-- ('kategori 2', 'Non Bus & Non Truk', 125000001, 200000000),
-- ('kategori 3', 'Non Bus & Non Truk', 200000001, 400000000),
-- ('kategori 4', 'Non Bus & Non Truk', 400000001, 800000000),
-- ('kategori 5', 'Non Bus & Non Truk', 800000001, 5000000000),
-- ('kategori 6', 'Truk & Pick Up semua', 0, 5000000000),
-- ('kategori 7', 'Bus semua', 0, 5000000000),
-- ('kategori 8', 'Kendaraan roda 2', 0, 5000000000);

-- CREATE TABLE region (
-- 	id INT PRIMARY KEY AUTO_INCREMENT,
--     region_name VARCHAR(50) 
-- );

-- INSERT INTO region (region_name) VALUES
-- ('Wilayah 1'),
-- ('Wilayah 2'),
-- ('Wilayah 3'); 

-- SELECT * FROM region

-- DROP TABLE IF EXISTS premium_rate;
--  CREATE TABLE premium_rate_comprehensive (
-- id INT PRIMARY KEY AUTO_INCREMENT,
-- vehicle_category_id INT, -- Foreign key from vehicle_category table
--  region_id INT, -- Foreign key from region table
-- lower_bound_rate DECIMAL(5, 4), -- E.g., 0.0382
-- upper_bound_rate DECIMAL(5, 4), -- E.g., 0.0420
-- FOREIGN KEY (vehicle_category_id) REFERENCES vehicle_category(id),
-- FOREIGN KEY (region_id) REFERENCES region(id)
-- );

-- INSERT INTO premium_rate_comprehensive (vehicle_category_id, region_id, lower_bound_rate, upper_bound_rate) VALUES
-- (1, 1, 0.0382, 0.0420), 
-- (1, 2, 0.0344, 0.0378),
-- (1, 3, 0.0253, 0.0278), 
-- (2, 1, 0.0267, 0.0294),
-- (2, 2, 0.0247, 0.0272),
-- (2, 3, 0.0207, 0.0228),
-- (3, 1, 0.0171, 0.0188),
-- (3, 2, 0.0171, 0.0188),
-- (3, 3, 0.0140, 0.0154),
-- (4, 1, 0.0120, 0.0132),
-- (4, 2, 0.0120, 0.0132),
-- (4, 3, 0.0120, 0.0132),
-- (5, 1, 0.0105, 0.0116),
-- (5, 2, 0.0105, 0.0116),  
-- (5, 3, 0.0105, 0.0116),       
-- (6, 1, 0.0133, 0.0146),
-- (6, 2, 0.0133, 0.0146),  
-- (6, 3, 0.0133, 0.0146), 
-- (7, 1, 0.0071, 0.0078),
-- (7, 2, 0.0071, 0.0078), 
-- (7, 3, 0.0071, 0.0078),
-- (8, 1, 0.0211, 0.0232),
-- (8, 2, 0.0211, 0.0232), 
-- (8, 3, 0.0211, 0.0232);

-- SELECT * FROM premium_rate_comprehensive;

--  CREATE TABLE premium_rate_TLO (
-- id INT PRIMARY KEY AUTO_INCREMENT,
-- vehicle_category_id INT, -- Foreign key from vehicle_category table
--  region_id INT, -- Foreign key from region table
-- lower_bound_rate DECIMAL(5, 4), -- E.g., 0.0382
-- upper_bound_rate DECIMAL(5, 4), -- E.g., 0.0420
-- FOREIGN KEY (vehicle_category_id) REFERENCES vehicle_category(id),
-- FOREIGN KEY (region_id) REFERENCES region(id)
-- );

INSERT INTO premium_rate_TLO (vehicle_category_id, region_id, lower_bound_rate, upper_bound_rate) VALUES
(1, 1, 0.0047, 0.0056), 
(1, 2, 0.0065, 0.0078),
(1, 3, 0.0036, 0.0043), 
(2, 1, 0.0044, 0.0053),
(2, 2, 0.0044, 0.0053),
(2, 3, 0.0031, 0.0037),
(3, 1, 0.0029, 0.0035),
(3, 2, 0.0029, 0.0035),
(3, 3, 0.0029, 0.0035),
(4, 1, 0.0025, 0.0030),
(4, 2, 0.0025, 0.0030),
(4, 3, 0.0025, 0.0030),
(5, 1, 0.0020, 0.0024),
(5, 2, 0.0020, 0.0024),
(5, 3, 0.0020, 0.0024),     
(6, 1, 0.0053, 0.0064),
(6, 2, 0.0105, 0.0126),  
(6, 3, 0.0049, 0.0059), 
(7, 1, 0.0018, 0.0022),
(7, 2, 0.0018, 0.0022), 
(7, 3, 0.0018, 0.0022),
(8, 1, 0.0176, 0.0211),
(8, 2, 0.0180, 0.0216), 
(8, 3, 0.0067, 0.0080);

SELECT * FROM premium_rate_TLO;




