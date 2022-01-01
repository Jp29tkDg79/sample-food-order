import mongoose, { Schema, Document, Model } from "mongoose";

import { ItemDocumet, CartAttrs } from "./cart.model";

const TABLE_NAME = "order";

const ItemSchema = new Schema<ItemDocumet>({
  price: {
    type: Number,
    required: true,
  },
  quantity: {
    type: Number,
    required: true,
  },
  name: {
    type: String,
    required: true,
  },
});

interface OrderAttrs extends CartAttrs {}

interface OrderDocument extends OrderAttrs, Document {}

interface OrderModel extends Model<OrderDocument> {
  build(attrs: OrderAttrs): OrderDocument;
}

const OrderSchema = new Schema<OrderDocument>(
  {
    email: {
      type: String,
      required: true,
    },
    items: {
      type: [ItemSchema],
      required: true,
    },
    totalPrice: {
      type: Number,
      required: true,
    },
    totalQuantity: {
      type: Number,
      required: true,
    },
  },
  {
    toJSON: {
      transform: function (doc, ret) {
        ret.id = ret._id;
        delete ret._id;
        delete ret.__v;
      },
    },
  }
);

OrderSchema.statics.build = (attrs: OrderAttrs) => {
  return new Order(attrs);
};

const Order = mongoose.model<OrderDocument, OrderModel>(
  TABLE_NAME,
  OrderSchema
);

export default Order;
