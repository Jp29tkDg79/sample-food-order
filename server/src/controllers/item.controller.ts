import { Request, Response } from "express";

import Item from "../models/item.model";
import { isEmpty } from "../utils/validation";

export const allItems = async (req: Request, res: Response) => {
  try {
    const items = await Item.find({});
    res.status(200).send({ items });
  } catch (error) {
    res.status(400).send({ message: "No data" });
  }
};

export const createNewItem = async (req: Request, res: Response) => {
  const { name, price, summary } = req.body;
  if (isEmpty(name) || isEmpty(price) || isEmpty(summary)) {
    return res.status(400).send({ message: "Please check input data" });
  }
  let item;
  try {
    item = await Item.build({
      name,
      price,
      summary,
    });
    await item.save();
  } catch (error) {
    console.log(error);
    res.status(400).send({ message: "Not insert product data" });
    return;
  }
  res.status(200).send({ item });
};

export const updateItem = async (req: Request, res: Response) => {
  const { id } = req.params;
  const { name, price, summary } = req.body;

  if (isEmpty(name) || isEmpty(price) || isEmpty(summary)) {
    return res.status(400).send({ message: "Please check input data" });
  }
  try {
    await Item.updateOne(
      {
        _id: id,
      },
      {
        name,
        price,
        summary,
      }
    );
  } catch (error) {
    console.log(error);
    res.status(400).send({ message: "Item updateing error" });
    return;
  }
  res.status(201).send({ message: "success" });
};

export const deleteItem = async (req: Request, res: Response) => {
  const { id } = req.params;
  await Item.deleteOne({ id });
  res.status(200).send({ message: "success" });
  return;
};
