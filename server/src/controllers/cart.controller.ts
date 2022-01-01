import { Request, Response } from "express";

import { decodeCookieJwt } from "../utils/decodeCookieJwt";

import Cart from "../models/cart.model";

export const getUserCart = async (req: Request, res: Response) => {
  const cookieData = decodeCookieJwt({ req, target: "email" });
  if (!cookieData) {
    return res.status(400).send({ message: "Not Cookie" });
  }
  const { email } = cookieData;

  let cart;
  const existingCart = await Cart.findOne({ email });
  if (!existingCart) {
    cart = await Cart.build({
      email: email,
      items: [],
      totalPrice: 0,
      totalQuantity: 0,
    });
    await cart.save();
  } else {
    cart = existingCart;
  }

  res.status(200).send({ cart });
};

export const setUserCart = async (req: Request, res: Response) => {
  const cookieData = decodeCookieJwt({req, target: "email"});
  if (!cookieData) {
    return res.status(400).send({ message: "not cookie" });
  }
  const { email } = cookieData;

  if (!req.body["cart"]) {
    return res.status(400).send({ message: "not cart data" });
  }
  const { cart } = req.body;

  const existingCart = await Cart.findOne({ email });

  let updateCart;
  if (!existingCart) {
    updateCart = await Cart.build({
      email: email,
      items: [],
      totalPrice: 0,
      totalQuantity: 0,
    });
    await updateCart.save();
  } else {
    updateCart = existingCart;
  }

  await updateCart.updateOne({
    email: email,
    items: cart.items,
    totalPrice: cart.totalPrice,
    totalQuantity: cart.totalQuantity,
  });
  await updateCart.save();

  res.status(200).send({ message: "success" });
};
