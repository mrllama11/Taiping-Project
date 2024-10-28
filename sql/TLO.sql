-- DROP TABLE IF EXISTS premium_rate_tlo;
--  CREATE TABLE premium_rate_TLO (
-- id INT PRIMARY KEY AUTO_INCREMENT,
-- vehicle_category_id INT, -- Foreign key from vehicle_category table
--  region_id INT, -- Foreign key from region table
--  rate DECIMAL (5,4),
-- FOREIGN KEY (vehicle_category_id) REFERENCES vehicle_category(id),
-- FOREIGN KEY (region_id) REFERENCES region(id)
-- );

INSERT INTO premium_rate_TLO (vehicle_category_id, region_id, rate) VALUES
(1, 1, 0.0047), 
(1, 2, 0.0065), 
(1, 3, 0.0051),
(2, 1, 0.0063), 
(2, 2, 0.0044), 
(2, 3, 0.0044),
(3, 1, 0.0041), 
(3, 2, 0.0038), 
(3, 3, 0.0029),   
(4, 1, 0.0025), 
(4, 2, 0.0025), 
(4, 3, 0.0023), 
(5, 1, 0.0020), 
(5, 2, 0.0020), 
(5, 3, 0.0020),
(6, 1, 0.0088),
(6, 2, 0.0168),  
(6, 3, 0.0081);     

SELECT * FROM premium_rate_TLO;