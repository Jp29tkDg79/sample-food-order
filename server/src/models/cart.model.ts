import mongoose, { Model, Document, Schema } from "mongoose";

const TABLE_NAME = "cart";

type ItemAttrs = {
  itemId: string;
  price: number;
  quantity: number;
  name: string;
};

export interface ItemDocumet extends ItemAttrs, Document {}

const ItemSchema = new Schema<ItemDocumet>({
  itemId: {
    type: String,
    required: true,
  },
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

export type CartAttrs = {
  email: string;
  items: ItemAttrs[];
  totalQuantity: number;
  totalPrice: number;
};

interface CartDocument extends CartAttrs, Document {}

interface CartModel extends Model<CartDocument> {
  build(attrs: CartAttrs): CartDocument;
}

const CartSchema = new Schema<CartDocument>(
  {
    email: {
      type: String,
      required: true,
      unique: true,
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

CartSchema.statics.build = (attrs: CartAttrs) => {
  return new Cart(attrs);
};

const Cart = mongoose.model<CartDocument, CartModel>(TABLE_NAME, CartSchema);

export default Cart;
