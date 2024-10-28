-- DROP TABLE IF EXISTS premium_rate_comprehensive;
--   CREATE TABLE premium_rate_comprehensive (
--  id INT PRIMARY KEY AUTO_INCREMENT,
--  vehicle_category_id INT, -- Foreign key from vehicle_category table
--   region_id INT, -- Foreign key from region table
--  year_0_5 DECIMAL (5,4),
--  year_6 DECIMAL (5,4),
--  year_7 DECIMAL (5,4),-- loading premi
--  year_8 DECIMAL (5,4),
--  year_9 DECIMAL (5,4),
--  year_10 DECIMAL (5,4),
--  FOREIGN KEY (vehicle_category_id) REFERENCES vehicle_category(id),
--  FOREIGN KEY (region_id) REFERENCES region(id)
--  );

-- category 1 0 125 352 4 5 6 7 8
-- categoiry 2 1 2 344 6 78 89
-- category 3 1 34543243 34  234 6 45
-- INSERT INTO premium_rate_comprehensive (vehicle_category_id, region_id, year_0_5, year_6, year_7, year_8, year_9, year_10) VALUES
-- m  
-- (2, 1, 0.0267, 0.0280, 0.0294, 0.0307, 0.0320, 0.0334),
-- (2, 2, 0.0247, 0.0259, 0.0272, 0.0284, 0.0296, 0.0309),
-- (2, 3, 0.0269, 0.0282, 0.0296, 0.0309, 0.0323, 0.0336),
-- (3, 1, 0.0218, 0.0229, 0.0240, 0.0251, 0.0262, 0.0273),
-- (3, 2, 0.0208, 0.0218, 0.0229, 0.0239, 0.0250, 0.0260),
-- (3, 3, 0.0179, 0.0188, 0.0197, 0.0206, 0.0215, 0.0224),
-- (4, 1, 0.0120, 0.0126, 0.0132, 0.0138, 0.0144, 0.0150),
-- (4, 2, 0.0120, 0.0126, 0.0132, 0.0138, 0.0144, 0.0150),
-- (4, 3, 0.0114, 0.0120, 0.0125, 0.0131, 0.0137, 0.0143),
-- (5, 1, 0.0105, 0.0110, 0.0116, 0.0121, 0.0126, 0.0131),
-- (5, 2, 0.0105, 0.0110, 0.0116, 0.0121, 0.0126, 0.0131),
-- (5, 3, 0.0105, 0.0110, 0.0116, 0.0121, 0.0126, 0.0131),
-- (6, 1, 0.0242, 0.0116, 0.0126, 0.0258, 0.0126, 0.0131),
-- (6, 2, 0.0239, 0.0244, 0.0250, 0.0255, 0.0260, 0.0265),
-- (6, 3, 0.0223, 0.0228, 0.0234, 0.0239, 0.0244, 0.0249);






 SELECT * FROM premium_rate_comprehensive;