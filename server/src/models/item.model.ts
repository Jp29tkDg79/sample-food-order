import mongoose, { Model, Document, Schema } from "mongoose";

const TABLE_NAME = "items";

type ItemAttrs = {
  name: string;
  price: number;
  summary: string;
};

interface ItemDocument extends ItemAttrs, Document {}

interface ItemModel extends Model<ItemDocument> {
  build(attrs: ItemAttrs): ItemDocument;
}

const ItemSchema = new Schema<ItemDocument>(
  {
    name: {
      type: String,
      required: true,
    },
    price: {
      type: Number,
      required: true,
    },
    summary: {
      type: String,
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

ItemSchema.statics.build = (attrs: ItemAttrs) => {
  return new Item(attrs);
};

const Item = mongoose.model<ItemDocument, ItemModel>(TABLE_NAME, ItemSchema);

export default Item;
