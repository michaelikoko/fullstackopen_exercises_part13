const { ReadingList, User } = require("../models");

const addToReadingList = async (req, res) => {
  // Add a blog to reading list

  //const user = await User.findByPk(req.decodedToken.id);
  //if (!user) {
  //    return res.status(404).json({error: 'Unauthorized'})
  //}
  const readingList = await ReadingList.create({ ...req.body });
  return res.status(201).json(readingList);
};

const markAsRead = async (req, res) => {
  // Mark a blog as read
  const user = await User.findByPk(req.decodedToken.id);
  const readingList = await ReadingList.findOne({
    where: { userId: user.id, blogId: req.params.id },
  });
  if (!user) {
    return res.status(404).json({ error: "Unauthorized" });
  }
  if (!readingList) {
    return res.status(404).json({ error: "Blog not found" });
  }
  //console.log(readingList);
  await readingList.update({...req.body})
  return res.status(200).json(readingList)
};

module.exports = {
  addToReadingList,
  markAsRead,
};
