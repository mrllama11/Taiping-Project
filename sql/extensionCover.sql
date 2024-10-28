-- CREATE TABLE extension_cover (
-- 	extension_id SERIAL PRIMARY KEY,
--     coverage_type VARCHAR(255),
--     region_id INT,
--     rate_comprehensive DECIMAL(5,4),
--     rate_tlo DECIMAL(5,4),
--     FOREIGN KEY (region_id) REFERENCES region(id)
--     
-- );

INSERT INTO extension_cover( coverage_type, region_id, rate_comprehensive, rate_tlo) VALUES
('Personal Accident for passengser ', NULL, 0.001, 0.001),
('Personal Accident for driver ', NULL, 0.005, 0.005),
('Banjir & Topan ', 1, 0.0075, 0.0050),
('Banjir & Topan ', 2, 0.0100, 0.0075),
('Banjir & Topan ', 3, 0.0075, 0.0050),
('Gempa & Tsunami ', 1, 0.0120, 0.0085),
('Gempa & Tsunami ', 2, 0.0100, 0.0075),
('Gempa & Tsunami ', 3, 0.0075, 0.0050),
('Huru Hara ', NULL, 0.0050, 0.0035),
('Terorisme & Sabotase ', NULL, 0.0050, 0.0035);
SELECT * FROM extension_cover;