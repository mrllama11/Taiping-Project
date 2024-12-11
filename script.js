require('dotenv').config();
const cloudinary = require('cloudinary').v2;
const fs = require ('fs');


// Configuration
cloudinary.config({ 
    cloud_name: process.env.CLOUDINARY_API_NAME,
    secure: true, 
    api_key: process.env.CLOUDINARY_API_KEY, 
    api_secret: process.env.CLOUDINARY_API_SECRET // Click 'View API Keys' above to copy your API secret
});



(async function () {
    try {
        // Corrected file path with backslashes
        const filePath = 'images/ICBC_logo.png'; // Option 1: Rename to avoid spaces
        
        // Check if file exists
        if (!fs.existsSync(filePath)) {
            console.error('File does not exist:', filePath);
            return;
        }
        
        // Upload to Cloudinary
        const results = await cloudinary.uploader.upload(filePath);
        console.log('Upload Result:', JSON.stringify(results, null, 2));
    } catch (error) {
        console.error('Upload Failed:', error);
    }
})();
    
