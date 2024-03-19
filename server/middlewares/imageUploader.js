const multer = require("multer");

const cloudinary = require('cloudinary').v2;
const { CloudinaryStorage } = require('multer-storage-cloudinary');

cloudinary.config({
    cloud_name:"dt02xqhsa",
    api_key: "388524433243174",
    api_secret:"ZWU8fVIPI2D3JgzFHfjFEe3KLKA"
});

const storage = new CloudinaryStorage({
    cloudinary,
    params: {
        folder: 'CloudinaryDemo',
        allowedFormats: ['jpeg', 'png', 'jpg'],
    }                                                              
}); 

module.exports = imageUploader = multer({storage: storage});