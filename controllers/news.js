import Post from "../models/Post.js";

export const getNews = async (req, res) => {
  try {
    const portion = req.query.portion;
    const currentPage = req.query.currentPage;
    const news = await Post.find()
      .populate("from")
      .populate("to")
      .sort({ date: -1 })
      .limit(portion * currentPage);
    const count = await Post.find().count();

    res.json({ news, count });
  } catch (e) {
    res
      .status(500)
      .json({ message: "Щось пішло не так, спробуйте ще раз", resultCode: 0 });
  }
};
