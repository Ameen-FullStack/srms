const cloudinary = require('cloudinary').v2;
const { CloudinaryStorage } = require('multer-storage-cloudinary');
const multer = require('multer');
const dotenv = require('dotenv');
dotenv.config();

cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key:    process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET
});

const storage = new CloudinaryStorage({
  cloudinary,
  params: async (req, file) => {
    let resource_type = 'raw';
    if (file.mimetype.startsWith('image/')) resource_type = 'image';
    return {
      folder: 'studyshare/materials',
      resource_type,
      public_id: `${Date.now()}-${file.originalname.replace(/\s+/g, '_')}`
    };
  }
});

// Local storage fallback (used if cloudinary not configured)
const localStorage = multer.diskStorage({
  destination: (req, file, cb) => cb(null, 'uploads/'),
  filename:    (req, file, cb) => cb(null, `${Date.now()}-${file.originalname}`)
});

const fileFilter = (req, file, cb) => {
  const allowed = [
    'application/pdf',
    'application/msword',
    'application/vnd.openxmlformats-officedocument.wordprocessingml.document',
    'application/vnd.ms-powerpoint',
    'application/vnd.openxmlformats-officedocument.presentationml.presentation',
    'image/jpeg', 'image/png', 'image/gif',
    'text/plain'
  ];
  if (allowed.includes(file.mimetype)) cb(null, true);
  else cb(new Error('File type not allowed. Allowed: PDF, DOC, DOCX, PPT, PPTX, JPG, PNG, TXT'), false);
};

const upload = multer({
  storage: process.env.CLOUDINARY_CLOUD_NAME ? storage : localStorage,
  fileFilter,
  limits: { fileSize: 20 * 1024 * 1024 } // 20MB
});

module.exports = { upload, cloudinary };
