const renderStars = (rating) => {
  const stars = Math.round(rating || 0);

  return "★".repeat(Math.min(stars, 5)) + "☆".repeat(5 - Math.min(stars, 5));
};

export default renderStars;
