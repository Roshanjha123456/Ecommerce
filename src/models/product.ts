import mongoose from "mongoose";
import validator from "validator";

export interface IProduct extends Document {
  name: String;
  photo: String;
  price: number;
  stock: number;
  category:number;
}

const schema = new mongoose.Schema(
  {
   
    name: {
      type: String,
      required: [true, "Please enter name"],
    },
    photo: {
      type: String,
      required: [true, "Please add photo"],
    },
    price:{
      type: Number,
      required: [true, "Please Enter price"],
    },
    stock:{
      type:Number,
      required:[true,"Please Enter stock"]
    },
   category:{
    type:String,
    required:[true, "Please Enter Category"],
    trim:true
   }
  },
  {
    timestamps: true,
  }
);



export const Product = mongoose.model<IProduct>("Product", schema);
