const mongoose = require('mongoose');

const categorySchema = new mongoose.Schema({
  name:     { type: String, required: true, trim: true },
  course:   { type: String, required: true, trim: true },
  semester: { type: Number, required: true, min: 1, max: 8 },
  description: { type: String, default: '' }
}, { timestamps: true });

categorySchema.index({ course: 1, semester: 1 });

module.exports = mongoose.model('Category', categorySchema);
