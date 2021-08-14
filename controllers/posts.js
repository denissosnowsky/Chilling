import Post from "../models/Post.js";
import { v4 as uuidv4 } from "uuid";
import fs from "fs";

export const postAdd = async (req, res) => {
  try {
    const from = req.user.userId;
    const { text, to } = req.body;
    let img;
    if (req.files) {
      img = req.files.img;
      const imageName = uuidv4() + ".jpg";
      img.mv(req.filePath + "/" + imageName);
      img = imageName;
    } else {
      img = "";
    }
    if (img || text) {
      const post = new Post({ text, img, from, to });
      await post.save();
      res
        .status(201)
        .json({ message: "Пост успішно створений", resultCode: 1 });
    } else {
      res
        .status(500)
        .json({ message: "Не можна створювати пустий пост", resultCode: 0 });
    }
  } catch (e) {
    res
      .status(500)
      .json({ message: "Щось пішло не так, спробуйте ще раз", resultCode: 0 });
  }
};

export const getPosts = async (req, res) => {
  try {
    const { id, portion, currentPage } = req.body;

    const posts = await Post.find({ to: id })
      .populate("from")
      .populate("to")
      .sort({ date: -1 })
      .limit(portion * currentPage);
    const count = await Post.find({ to: id }).count();

    res.json({ posts, count });
  } catch (e) {
    res
      .status(500)
      .json({ message: "Щось пішло не так, спробуйте ще раз", resultCode: 0 });
  }
};

export const removePosts = async (req, res) => {
  try {
    const postForImg = await Post.findById(req.body.id);
    if (postForImg.img && fs.existsSync(req.filePath + "/" + postForImg.img)) {
      fs.unlinkSync(req.filePath + "/" + postForImg.img);
    }
    const post = await Post.findByIdAndRemove(req.body.id);

    res.status(200).json({ message: "Пост успішно видалений", resultCode: 1 });
  } catch (e) {
    res
      .status(500)
      .json({ message: "Щось пішло не так, спробуйте ще раз", resultCode: 0 });
  }
};

export const likePost = async (req, res) => {
  try {
    const like = await Post.findOneAndUpdate(
      { _id: req.body.id },
      { $push: { liked: req.body.me } }
    );
    return res.json("Ви вподобали пост");
  } catch (e) {
    res
      .status(500)
      .json({ message: "Щось пішло не так, спробуйте ще раз", resultCode: 0 });
  }
};

export const dislikePost = async (req, res) => {
  try {
    const dislike = await Post.findOneAndUpdate(
      { _id: req.body.id },
      { $pull: { liked: req.body.me } }
    );
    return res.json("Ви дизлайкнули пост");
  } catch (e) {
    res
      .status(500)
      .json({ message: "Щось пішло не так, спробуйте ще раз", resultCode: 0 });
  }
};
