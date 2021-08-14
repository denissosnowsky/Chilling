import { validationResult } from "express-validator";
import bcrypt from "bcryptjs";
import config from "config";
import jwt from "jsonwebtoken";
import User from "../models/User.js";

export const register = async (req, res) => {
  try {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({
        errors: errors.array(),
        message: "Не правильні дані при реєстрації",
        resultCode: 0,
      });
    }

    const { email, password, name, surname, city } = req.body;
    const candidate = await User.findOne({ email });

    if (candidate) {
      return res
        .status(400)
        .json({ message: "Такий користувач вже існує", resultCode: 0 });
    }

    const lastOrder = await User.findOne().sort({ date: -1 });

    const order = lastOrder ? lastOrder.order : 0;

    const hashedPassword = await bcrypt.hash(password, 8);
    const user = new User({
      email,
      password: hashedPassword,
      name,
      surname,
      city,
      order: order + 1,
    });
    await user.save();
    res
      .status(201)
      .json({ message: "Користувач успішно створений", resultCode: 1 });
  } catch (e) {
    res
      .status(500)
      .json({ message: "Щось пішло не так, спробуйте ще раз", resultCode: 0 });
  }
};

export const login = async (req, res) => {
  try {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({
        errors: errors.array(),
        message: "Не правильні дані при вході",
        resultCode: 0,
      });
    }

    const { email, password } = req.body;
    const user = await User.findOne({ email });
    if (!user) {
      return res
        .status(404)
        .json({ message: "Неправильні логін або пароль", resultCode: 0 });
    }
    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      return res
        .status(404)
        .json({ message: "Неправильні логін або пароль", resultCode: 0 });
    }

    const token = jwt.sign({ userId: user.id }, config.get("jwtSecret"), {
      expiresIn: "1h",
    });
    res.json({
      token,
      userId: user.id,
      sImg: user.sImg,
      order: user.order,
      resultCode: 1,
    });
  } catch (e) {
    res
      .status(500)
      .json({ message: "Щось пішло не так, спробуйте ще раз", resultCode: 0 });
  }
};

export const verify = async (req, res) => {
  try {
    const user = await User.findOne({ _id: req.user.userId });
    const token = jwt.sign({ userId: user.id }, config.get("jwtSecret"), {
      expiresIn: "1h",
    });
    res.json({
      token,
      userId: user.id,
      sImg: user.sImg,
      order: user.order,
      resultCode: 1,
    });
  } catch (e) {
    res
      .status(500)
      .json({ message: "Щось пішло не так, спробуйте ще раз", resultCode: 0 });
  }
};
