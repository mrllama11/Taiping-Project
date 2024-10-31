-- DROP TABLE if exists extension_cover;
CREATE TABLE extension_cover (
	extension_id SERIAL PRIMARY KEY,
    coverage_type VARCHAR(255),
    region_id INT,
    rate_comprehensive DECIMAL(5,5),
    rate_tlo DECIMAL(5,5),
    FOREIGN KEY (region_id) REFERENCES region(id)
    
);

-- INSERT INTO extension_cover( coverage_type, region_id, rate_comprehensive, rate_tlo) VALUES
-- ('Personal Accident for passengser ', NULL, 0.001, 0.001),
-- ('Personal Accident for driver ', NULL, 0.005, 0.005),
-- ('Banjir & Topan ', 1, 0.0075, 0.00050),
-- ('Banjir & Topan ', 2, 0.0010, 0.00075),
-- ('Banjir & Topan ', 3, 0.00075, 0.00050),
-- ('Gempa & Tsunami ', 1, 0.00120, 0.00085),
-- ('Gempa & Tsunami ', 2, 0.00100, 0.00075),
-- ('Gempa & Tsunami ', 3, 0.00075, 0.00050),
-- ('Huru Hara ', NULL, 0.00050, 0.00035),
-- ('Terorisme & Sabotase ', NULL, 0.0050, 0.0035); 
-- SELECT * FROM extension_cover;