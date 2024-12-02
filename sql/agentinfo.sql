DROP TABLE IF EXISTS Agent_Form_info;
CREATE TABLE Agent_Form_Info(
	Id INT AUTO_INCREMENT PRIMARY KEY,
    Title VARCHAR (100),
    Customer_name VARCHAR (255),
    Customer_Email VARCHAR (255),
    Customer_Phone_Number VARCHAR (15),
    Customer_Address VARCHAR (255),
    Customer_KTP VARCHAR (16),
    Customer_AAUI_Number VARCHAR (30),
    Target_Certification VARCHAR (50),
    Customer_Bank_Name VARCHAR (30),
    Customer_Bank_Account_Number VARCHAR (30),
    Customer_References VARCHAR (30),
    user_role ENUM('Financial Consultant', 'Agency Director') NOT NULL,
    file_paths JSON,  -- To store file paths as JSON for uploaded documents
	created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
);