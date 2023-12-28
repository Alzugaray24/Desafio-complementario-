import mongoose from "mongoose";
import { Schema, model } from "mongoose";


const cartSchema = new Schema({
  products: [
    {
      product: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "products",
        required: true,
      },
      quantity: {
        type: Number,
        default: 1,
        min: 1, 
      },
    },
  ],
});

const cartsModel = model("cart", cartSchema);

export { cartsModel };
