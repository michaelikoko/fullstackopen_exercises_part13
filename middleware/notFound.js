const notFound = async (req, res, next) => {
  return res.status(404).json({ error: "Route does not exist" });
};

module.exports = notFound;
