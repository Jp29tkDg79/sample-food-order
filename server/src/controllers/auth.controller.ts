import { Request, Response } from "express";

import bcrypt from "bcryptjs";

import User from "../models/user.model";

import { signJwt } from "../utils/signJwt";

import {
  userDetailsAreValid,
  emailIsConfirmed,
  isEmail,
  checkPassword,
} from "../utils/validation";
import { decodeCookieJwt } from "../utils/decodeCookieJwt";

export const checkCookie = async (req: Request, res: Response) => {
  const cookieData = decodeCookieJwt({req, target: "email"});
  if (!cookieData) {
    return res.status(400).send({ message: "Not cookie" });
  }

  const user = await User.findOne({ email: cookieData["email"] });
  if (!user) {
    return res.status(400).send({ message: "Not User" });
  }
  res
    .status(200)
    .send({ name: user.name, email: user.email, isAdmin: user.isAdmin });
};

export const signup = async (req: Request, res: Response) => {
  const { name, email, confirmEmail, password, street, postal, city } =
    req.body;

  if (
    !userDetailsAreValid(email, password, street, postal, city) ||
    !emailIsConfirmed(email, confirmEmail)
  ) {
    return res.status(400).send({ message: "Please check your input data" });
  }

  const existingUser = await User.findOne({ email });
  if (existingUser) {
    return res.status(400).send({ message: "Existing user" });
  }

  const hashedPassword = await bcrypt.hash(password, 12);

  const user = await User.build({
    name,
    email,
    password: hashedPassword,
    address: {
      street,
      postal,
      city,
    },
    isAdmin: false,
  });

  await user.save();

  const userJwt = signJwt(email);
  res.cookie(process.env.JWT_KEY_NAME!, userJwt);

  res
    .status(201)
    .send({ name: user.name, email: user.email, isAdmin: user.isAdmin });
};

export const login = async (req: Request, res: Response) => {
  const { email, password } = req.body;

  if (!isEmail(email) || !checkPassword(password)) {
    return res.status(400).send({ message: "Please check your input data" });
  }

  const user = await User.findOne({ email });
  if (!user) {
    return res.status(400).send({ message: "Invalid credentials" });
  }

  const passwordMatch = await user.compare(password);
  if (!passwordMatch) {
    return res.status(400).send({ message: "Entered password is unmatch!" });
  }

  const userJwt = signJwt(email);
  res.cookie(process.env.JWT_KEY_NAME!, userJwt);

  res
    .status(201)
    .send({ name: user.name, email: user.email, isAdmin: user.isAdmin });
};

export const logout = async (req: Request, res: Response) => {
  res.clearCookie(process.env.JWT_KEY_NAME!);
  res.status(200).send({ message: "success" });
};
