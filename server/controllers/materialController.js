const Material = require('../models/Material');

// POST /api/materials/upload
exports.uploadMaterial = async (req, res) => {
  try {
    if (!req.file)
      return res.status(400).json({ success: false, message: 'No file uploaded.' });

    const { title, description, subject, semester, course, tags } = req.body;
    if (!title || !subject || !semester || !course)
      return res.status(400).json({ success: false, message: 'Title, subject, semester and course are required.' });

    const fileType = Material.resolveFileType(req.file.mimetype);
    // Cloudinary returns req.file.path; local multer returns req.file.filename
    const fileUrl  = req.file.path || `/uploads/${req.file.filename}`;

    const material = await Material.create({
      title:       title.trim(),
      description: description ? description.trim() : '',
      subject:     subject.trim(),
      semester:    Number(semester),
      course:      course.trim(),
      uploadedBy:  req.user._id,
      fileUrl,
      fileType,
      fileName:  req.file.originalname,
      fileSize:  req.file.size,
      publicId:  req.file.filename || req.file.public_id || '',
      tags:      tags ? tags.split(',').map(t => t.trim()).filter(Boolean) : [],
      status:    'pending'
    });

    res.status(201).json({
      success: true,
      message: 'Material uploaded successfully. Awaiting admin approval.',
      material
    });
  } catch (err) {
    res.status(500).json({ success: false, message: err.message });
  }
};

// GET /api/materials  (approved materials only, public)
exports.getMaterials = async (req, res) => {
  try {
    const { search, subject, semester, course, fileType, sort, page = 1, limit = 12 } = req.query;
    const query = { status: 'approved' };

    if (search)   query.$text    = { $search: search };
    if (subject)  query.subject  = new RegExp(subject,  'i');
    if (semester) query.semester = Number(semester);
    if (course)   query.course   = new RegExp(course,   'i');
    if (fileType) query.fileType = fileType;

    const sortMap = {
      newest:  { createdAt: -1 },
      oldest:  { createdAt:  1 },
      popular: { downloadCount: -1 },
      rating:  { avgRating: -1 }
    };
    const sortBy = sortMap[sort] || { createdAt: -1 };

    const skip  = (Number(page) - 1) * Number(limit);
    const total = await Material.countDocuments(query);
    const materials = await Material.find(query)
      .sort(sortBy)
      .skip(skip)
      .limit(Number(limit))
      .populate('uploadedBy', 'name profilePic')
      .populate('category',   'name');

    res.json({
      success: true,
      total,
      page:  Number(page),
      pages: Math.ceil(total / Number(limit)),
      materials
    });
  } catch (err) {
    res.status(500).json({ success: false, message: err.message });
  }
};

// GET /api/materials/stats
exports.getStats = async (req, res) => {
  try {
    const [totalMaterials, downloadAgg, contributors] = await Promise.all([
      Material.countDocuments({ status: 'approved' }),
      Material.aggregate([{ $group: { _id: null, total: { $sum: '$downloadCount' } } }]),
      Material.distinct('uploadedBy', { status: 'approved' })
    ]);
    res.json({
      success: true,
      stats: {
        totalMaterials,
        totalDownloads:    downloadAgg[0]?.total || 0,
        totalContributors: contributors.length
      }
    });
  } catch (err) {
    res.status(500).json({ success: false, message: err.message });
  }
};

// GET /api/materials/my  (logged-in user's own uploads)
exports.getMyMaterials = async (req, res) => {
  try {
    const materials = await Material.find({ uploadedBy: req.user._id }).sort({ createdAt: -1 });
    res.json({ success: true, materials });
  } catch (err) {
    res.status(500).json({ success: false, message: err.message });
  }
};

// GET /api/materials/:id
exports.getMaterialById = async (req, res) => {
  try {
    const material = await Material.findById(req.params.id)
      .populate('uploadedBy', 'name profilePic email')
      .populate('category',   'name');

    if (!material)
      return res.status(404).json({ success: false, message: 'Material not found.' });

    // Only admins can view non-approved materials
    if (material.status !== 'approved' && (!req.user || req.user.role !== 'admin'))
      return res.status(403).json({ success: false, message: 'This material is not yet approved.' });

    res.json({ success: true, material });
  } catch (err) {
    res.status(500).json({ success: false, message: err.message });
  }
};

// PUT /api/materials/:id/download  (increment download counter, return fileUrl)
exports.downloadMaterial = async (req, res) => {
  try {
    const material = await Material.findById(req.params.id);
    if (!material)
      return res.status(404).json({ success: false, message: 'Material not found.' });
    material.downloadCount += 1;
    await material.save();
    res.json({ success: true, fileUrl: material.fileUrl });
  } catch (err) {
    res.status(500).json({ success: false, message: err.message });
  }
};

// DELETE /api/materials/:id
exports.deleteMaterial = async (req, res) => {
  try {
    const material = await Material.findById(req.params.id);
    if (!material)
      return res.status(404).json({ success: false, message: 'Material not found.' });

    const isOwner = material.uploadedBy.toString() === req.user._id.toString();
    if (!isOwner && req.user.role !== 'admin')
      return res.status(403).json({ success: false, message: 'Not authorized to delete this material.' });

    await material.deleteOne();
    res.json({ success: true, message: 'Material deleted successfully.' });
  } catch (err) {
    res.status(500).json({ success: false, message: err.message });
  }
};
