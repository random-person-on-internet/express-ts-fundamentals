import User from "../models/user.model.js";
import jwt from "jsonwebtoken";
import bcrypt from "bcryptjs";
import config from "../config.js";

const users = [];

const register = async (req, res) => {
  const salt = await bcrypt.genSalt(10);
  const hashedPassword = await bcrypt.hash(req.body.password, salt);

  let user = new User({
    id: users.length + 1,
    email: req.body.email,
    name: req.body.name,
    password: hashedPassword,
    user_type_id: req.body.user_type_id,
  });

  users.push(user);

  let payload = {
    id: user.id,
    user_type_id: user.user_type_id,
  };
  const token = jwt.sign(payload, config.TOKEN_SECRET);

  res.status(200).send({ token });
};

const login = async (req, res) => {
  const user = users.find((u) => u.email === req.body.email);
  if (!user) return res.status(401).send("Invalid email");

  const validPass = await bcrypt.compare(req.body.password, user.password);
  if (!validPass) return res.status(401).send("Invalid password");

  let payload = {
    id: user.id,
    user_type_id: user.user_type_id,
  };
  const token = jwt.sign(payload, config.TOKEN_SECRET);

  res.status(200).header("auth-token", token).send({ token });
};

const userEvent = (req, res) => {
  res.send("User event accessed");
};
const adminEvent = (req, res) => {
  res.send("Admin event accessed");
};

export { register, login, userEvent, adminEvent };
