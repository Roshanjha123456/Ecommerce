import { TryCatch } from "../middleware/error/error.js";
import { Request } from "express";
import { BaseQuery, NewProductRequest } from "../types/type.js";
import { IProduct, Product } from "../models/product.js";
import ErrorHandler from "../utilis/utility-class.js";
import { rm } from "fs";

export const newProduct = TryCatch(
  async (req: Request<{}, {}, NewProductRequest>, res, next) => {
    const { name, price, stock, category } = req.body;
    const photo = req.file;
    if (!photo) return next(new ErrorHandler("please Add Photo", 400));

    if (!name || !price || !stock || !category) {
      rm(photo.path, () => {
        console.log(photo);
      });
      return next(new ErrorHandler("please Enter All Fields", 400));
    }

    await Product.create({
      name,
      price,
      stock,
      category: category.toLowerCase(),
      photo: photo?.path,
    });

    res.json({
      success: true,
      message: "Product Created Successful !",
    });
  }
);

export const latestProduct = TryCatch(async (req, res, next) => {
  const product = await Product.find({}).sort({ createdAt: -1 }).limit(5);

  res.json({
    success: true,
    product,
    message: "Product Fetch Successful !",
  });
});

export const getCategories = TryCatch(async (req, res, next) => {
  const product = await Product.distinct("category");
  res.json({
    success: true,
    product,
    message: "Product category Successful!",
  });
});

export const getSingleProduct = TryCatch(async (req, res, next) => {
  console.log(req.params.id);
  const product = await Product.findById(req.params.id);
  console.log(product);
  res.json({
    success: true,
    product,
    message: "Product fetch Successful!",
  });
});

export const updateProduct = TryCatch(async (req, res, next) => {
  const { id } = req.params;
  const { name, price, stock, category } = req.body;

  const product: any = await Product.findById(id);

  if (!product) return next(new ErrorHandler("Invalid Id!", 400));
  const photo = req.file;

  if (photo) {
    rm(product.photo!, () => {
      console.log("Old photo Delete");
    });
    product.photo = photo.path;
  }

  if (name) product.name = name;
  if (price) product.price = price;
  if (stock) product.stock = stock;
  if (category) product.category = category;

  await product.save();

  res.json({
    success: true,
    message: "Product Update Successful !",
  });
});

export const deleteProduct = TryCatch(async (req, res, next) => {
  const product: any = await Product.findById(req.params.id);
  if (!product) return next(new ErrorHandler("Invalid Id!", 400));
  rm(product.photo!, () => {
    console.log("photo Delete");
  });
  await product.deleteOne();
  res.json({
    success: true,
    product,
    message: "Product Delete Successful!",
  });
});

export const productsFilter = TryCatch(async (req: any, res, next) => {
  const { search, price, category, sort } = req.query;
  const page = Number(req.query.page) || 1;
  const limit = 8;
  const skip = (page - 1) * limit;
  const baseQuery: BaseQuery = {};
  if (search) {
    baseQuery.name = {
      $regex: search as String,
      $options: "i",
    };
  }
  if (price) {
    baseQuery.price = {
      $lte: Number(price),
    };
  }
  if (category) {
    baseQuery.category = category as String;
  }
  const product = await Product.find(baseQuery).sort(
    sort ? { price: sort == "asc" ? 1 : -1 } : undefined
  ).limit(limit).skip(skip)

  const allProduct  = await Product.find({})
  const totalPages  = Math.ceil(allProduct.length / limit)
 

  res.json({
    success: true,
    product,
    message: "Product Fetch Successful !",
    totalPages:totalPages
  });
});
