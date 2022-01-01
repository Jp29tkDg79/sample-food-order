import { Request, Response } from "express";

import User from "../models/user.model";

import { decodeCookieJwt } from "../utils/decodeCookieJwt";
import { signJwt } from "../utils/signJwt";
import { isEmpty } from "../utils/validation";

export const getProfile = async (req: Request, res: Response) => {
  const cookieData = decodeCookieJwt({ req, target: "email" });
  if (!cookieData) {
    return res.status(400).send({ message: "Not cookie" });
  }
  const { email } = cookieData;

  const user = await User.findOne({ email });
  res.status(200).send({ user });
};

export const updateProfile = async (req: Request, res: Response) => {
  const {id} = req.params;
  const { name, email, street, postal, city } = req.body;
  if (
    isEmpty(name) ||
    isEmpty(email) ||
    isEmpty(street) ||
    (isEmpty(postal) && postal !== 5) ||
    isEmpty(city)
  ) {
    return res
      .status(400)
      .send({ message: "Please check input update profile data" });
  }

  const cookieData = decodeCookieJwt({ req, target: "email" });
  if (!cookieData) {
    return res.status(400).send({ message: "Not cookie" });
  }

  try {
    await User.updateOne(
      {
        _id: id,
      },
      {
        name,
        email,
        address: {
          street,
          postal,
          city,
        },
      }
    );
  } catch (error) {
    console.log(error);
    res.status(400).send({ message: "Profile updateing error" });
    return;
  }

  res.clearCookie(process.env.JWT_KEY_NAME!);
  const userJwt = signJwt(email);
  res.cookie(process.env.JWT_KEY_NAME!, userJwt);

  res.status(201).send({ name, email });
};
