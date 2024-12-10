-- DROP TABLE IF EXISTS Agent_Form_Info;


-- CREATE TABLE Agent_Form_Info(
--   Id INT AUTO_INCREMENT PRIMARY KEY,
--   Title VARCHAR (100),
--   Customer_name VARCHAR (255),
--   Customer_Email VARCHAR (255),
--   Customer_Phone_Number VARCHAR (15),
--   Customer_Address VARCHAR (255),
--   Customer_KTP VARCHAR (16),
--   Customer_NPWP VARCHAR (20),
--   Customer_AAUI_Number VARCHAR (30),
--   Target_Certification VARCHAR (50),
--   Customer_Bank_Name VARCHAR (30),
--   Customer_Bank_Account_Number VARCHAR (30),
--   Customer_References VARCHAR (30),
--   Agent_Role VARCHAR(100),
--   Office_Location VARCHAR(50),
--   created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
--   updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
-- );
-- -- ALTER TABLE agent_form_info MODIFY Agent_Role VARCHAR(100);


ALTER TABLE Agent_Form_Info MODIFY Customer_NPWP VARCHAR(20) NULL;
DESCRIBE agent_form_info;
-- SELECT @@sql_mode;
