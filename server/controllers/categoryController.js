const Category = require("../models/Category");

exports.getCategories = async (req, res) => {
  try {
    const categories = await Category.find().sort({
      course: 1,
      semester: 1,
    });

    res.json({ success: true, categories });
  } catch (err) {
    res.status(500).json({ success: false, message: err.message });
  }
};

exports.createCategory = async (req, res) => {
  try {
    const { name, course, semester, description } = req.body;

    const category = await Category.create({
      name,
      course,
      semester,
      description,
    });

    res.status(201).json({
      success: true,
      category,
    });
  } catch (err) {
    res.status(500).json({ success: false, message: err.message });
  }
};

exports.deleteCategory = async (req, res) => {
  try {
    await Category.findByIdAndDelete(req.params.id);

    res.json({
      success: true,
      message: "Category deleted.",
    });
  } catch (err) {
    res.status(500).json({ success: false, message: err.message });
  }
};
