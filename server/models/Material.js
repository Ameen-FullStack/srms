const mongoose = require('mongoose');

const materialSchema = new mongoose.Schema({
  title: {
    type: String, required: [true, 'Title is required'], trim: true, maxlength: 100
  },
  description: {
    type: String, trim: true, maxlength: 500, default: ''
  },
  uploadedBy: {
    type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true
  },
  category: {
    type: mongoose.Schema.Types.ObjectId, ref: 'Category'
  },
  subject: { type: String, required: true, trim: true },
  semester: { type: Number, required: true, min: 1, max: 8 },
  course:   { type: String, required: true, trim: true },
  fileUrl:  { type: String, required: true },
  fileType: {
    type: String,
    enum: ['pdf', 'doc', 'docx', 'ppt', 'pptx', 'jpg', 'png', 'gif', 'txt', 'other'],
    default: 'other'
  },
  fileName:    { type: String, default: '' },
  fileSize:    { type: Number, default: 0 },
  publicId:    { type: String, default: '' }, // cloudinary public_id
  status: {
    type: String, enum: ['pending', 'approved', 'rejected'], default: 'pending'
  },
  rejectionReason: { type: String, default: '' },
  downloadCount:   { type: Number, default: 0 },
  avgRating:       { type: Number, default: 0 },
  ratingCount:     { type: Number, default: 0 },
  tags: [{ type: String, trim: true }]
}, { timestamps: true });

materialSchema.index({ status: 1, subject: 1, semester: 1 });
materialSchema.index({ title: 'text', description: 'text', subject: 'text', tags: 'text' });

// Helper to resolve fileType from mimetype
materialSchema.statics.resolveFileType = function (mimetype) {
  const map = {
    'application/pdf': 'pdf',
    'application/msword': 'doc',
    'application/vnd.openxmlformats-officedocument.wordprocessingml.document': 'docx',
    'application/vnd.ms-powerpoint': 'ppt',
    'application/vnd.openxmlformats-officedocument.presentationml.presentation': 'pptx',
    'image/jpeg': 'jpg',
    'image/png': 'png',
    'image/gif': 'gif',
    'text/plain': 'txt'
  };
  return map[mimetype] || 'other';
};

module.exports = mongoose.model('Material', materialSchema);
