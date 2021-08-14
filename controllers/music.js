import Music from "../models/Music.js";
import User from "../models/User.js";

export const getAllMusic = async (req, res) => {
  try {
    const { search, portion, currentPage } = req.body;
    let music = await Music.find();
    const myMusic = await User.findOne({ _id: req.user.userId }, "music");
    if (search) {
      music = music
        .filter(
          (item) =>
            item.name.toLowerCase().indexOf(search.toLowerCase()) != -1 ||
            item.author.toLowerCase().indexOf(search.toLowerCase()) != -1
        )
        .reverse();
    } else {
      music = music.reverse();
    }
    let count = music.length;
    music = music.slice(0, portion * currentPage);

    const allMusic = music.map((song) => {
      if (myMusic.music.indexOf(song._id) != -1) {
        return Object.assign({ song }, { isAdded: true });
      } else {
        return Object.assign({ song }, { isAdded: false });
      }
    });
    res.json({ allMusic, count });
  } catch (e) {
    res
      .status(500)
      .json({ message: "Щось пішло не так, спробуйте ще раз", resultCode: 0 });
  }
};

export const getMyMusic = async (req, res) => {
  try {
    const { search, portion, currentPage } = req.body;

    const user = await User.findById(req.user.userId).populate("music");
    let music = user.music;

    const genCount = music.length;

    if (search) {
      music = music
        .filter(
          (item) =>
            item.name.toLowerCase().indexOf(search.toLowerCase()) != -1 ||
            item.author.toLowerCase().indexOf(search.toLowerCase()) != -1
        )
        .reverse();
    } else {
      music = music.reverse();
    }

    let count = music.length;
    music = music.slice(0, portion * currentPage);

    const allMusic = music.map((song) => {
      return Object.assign({ song }, { isAdded: true });
    });
    res.json({ allMusic, genCount, count });
  } catch (e) {
    res
      .status(500)
      .json({ message: "Щось пішло не так, спробуйте ще раз", resultCode: 0 });
  }
};

export const addMusic = async (req, res) => {
  try {
    const music = await User.findOneAndUpdate(
      { _id: req.user.userId },
      { $push: { music: req.body.id } }
    );
    return res.json({ message: "Пісня успішно добавлена" });
  } catch (e) {
    res
      .status(500)
      .json({ message: "Щось пішло не так, спробуйте ще раз", resultCode: 0 });
  }
};

export const deleteMusic = async (req, res) => {
  try {
    const music = await User.findOneAndUpdate(
      { _id: req.user.userId },
      { $pull: { music: req.body.id } }
    );
    return res.json({ message: "Пісня упсішно видалена" });
  } catch (e) {
    res
      .status(500)
      .json({ message: "Щось пішло не так, спробуйте ще раз", resultCode: 0 });
  }
};
