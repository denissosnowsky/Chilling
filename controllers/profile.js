import User from "../models/User.js";
import { v4 as uuidv4 } from "uuid";
import fs from "fs";

export const user = async (req, res) => {
  try {
    const userData = await User.findOne({ order: req.params.id });
    if (userData) {
      res.status(200).json(userData);
    } else {
      res
        .status(500)
        .json({ message: "Користувача не знайдено", resultCode: 0 });
    }
  } catch (e) {
    res
      .status(500)
      .json({ message: "Щось пішло не так, спробуйте ще раз", resultCode: 0 });
  }
};

export const saveSmallPhoto = async (req, res) => {
  try {
    const image = req.files.smallImg;
    const user = await User.findOne({ _id: req.user.userId });
    const imageName = uuidv4() + ".jpg";
    if (user.sImg) {
      fs.unlinkSync(req.filePath + "/" + user.sImg);
    }
    image.mv(req.filePath + "/" + imageName);
    user.sImg = imageName;

    await user.save();
    return res.json({ imageName });
  } catch (e) {
    res
      .status(500)
      .json({ message: "Щось пішло не так, спробуйте ще раз", resultCode: 0 });
  }
};

export const saveBigPhoto = async (req, res) => {
  try {
    const image = req.files.bigImg;
    const user = await User.findOne({ _id: req.user.userId });
    const imageName = uuidv4() + ".jpg";
    if (user.lImg && fs.existsSync(req.filePath + "/" + user.lImg)) {
      fs.unlinkSync(req.filePath + "/" + user.lImg);
    }
    image.mv(req.filePath + "/" + imageName);
    user.lImg = imageName;

    await user.save();
    return res.json({ imageName });
  } catch (e) {
    res
      .status(500)
      .json({ message: "Щось пішло не так, спробуйте ще раз", resultCode: 0 });
  }
};

export const setStatus = async (req, res) => {
  try {
    const user = await User.findOne({ _id: req.user.userId });
    user.status = req.body.status;
    await user.save();
    res.json({ status: req.body.status });
  } catch (e) {
    res
      .status(500)
      .json({ message: "Щось пішло не так, спробуйте ще раз", resultCode: 0 });
  }
};

export const setCity = async (req, res) => {
  try {
    const user = await User.findOne({ _id: req.user.userId });
    user.city = req.body.city;
    await user.save();
    res.json({ city: req.body.city });
  } catch (e) {
    res
      .status(500)
      .json({ message: "Щось пішло не так, спробуйте ще раз", resultCode: 0 });
  }
};

export const setBirth = async (req, res) => {
  try {
    const user = await User.findOne({ _id: req.user.userId });
    user.birth = req.body.birth;
    await user.save();
    res.json({ birth: req.body.birth });
  } catch (e) {
    res
      .status(500)
      .json({ message: "Щось пішло не так, спробуйте ще раз", resultCode: 0 });
  }
};

export const setEducation = async (req, res) => {
  try {
    const user = await User.findOne({ _id: req.user.userId });
    user.education = req.body.education;
    await user.save();
    res.json({ education: req.body.education });
  } catch (e) {
    res
      .status(500)
      .json({ message: "Щось пішло не так, спробуйте ще раз", resultCode: 0 });
  }
};

export const setPhone = async (req, res) => {
  try {
    const user = await User.findOne({ _id: req.user.userId });
    user.phone = req.body.phone;
    await user.save();
    res.json({ phone: req.body.phone });
  } catch (e) {
    res
      .status(500)
      .json({ message: "Щось пішло не так, спробуйте ще раз", resultCode: 0 });
  }
};

export const setBook = async (req, res) => {
  try {
    const user = await User.findOne({ _id: req.user.userId });
    user.book = req.body.book;
    await user.save();
    res.json({ book: req.body.book });
  } catch (e) {
    res
      .status(500)
      .json({ message: "Щось пішло не так, спробуйте ще раз", resultCode: 0 });
  }
};
