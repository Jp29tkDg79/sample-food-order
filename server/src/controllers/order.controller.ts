import { Request, Response } from "express";

import { decodeCookieJwt } from "../utils/decodeCookieJwt";

import Order from "../models/order.model";
import Cart from "../models/cart.model";

export const createNewOrder = async (req: Request, res: Response) => {
  const cookieData = decodeCookieJwt({req, target: "email"});
  if (!cookieData) {
    return res.status(400).send({ message: "Not cookie" });
  }
  const { email } = cookieData;

  const { items, totalPrice, totalQuantity } = req.body;

  if (
    !Array.isArray(items) ||
    !Number.isInteger(totalPrice) ||
    !Number.isInteger(totalQuantity)
  ) {
    console.log(items, totalPrice, totalQuantity);
    return res.status(400).send({ message: "Check send order data" });
  }

  try {
    const order = await Order.build({
      email,
      items,
      totalPrice,
      totalQuantity,
    });
    await order.save();

    await Cart.deleteOne({ email });
  } catch (err: any) {
    console.log(err);
    return res.status(400).send({ message: err.message });
  }

  res.status(200).send({ message: "success" });
};
