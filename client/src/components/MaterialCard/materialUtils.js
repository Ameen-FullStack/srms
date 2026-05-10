export const FILE_COLORS = {
  pdf: "#E24B4A",
  doc: "#185FA5",
  docx: "#185FA5",
  ppt: "#D85A30",
  pptx: "#D85A30",
  jpg: "#1D9E75",
  png: "#1D9E75",
  txt: "#888780",
};

export const renderStars = (rating) => {
  const n = Math.round(rating || 0);

  return "★".repeat(Math.min(n, 5)) + "☆".repeat(5 - Math.min(n, 5));
};
