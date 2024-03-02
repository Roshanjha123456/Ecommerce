import { TryCatch } from "../middleware/error/error.js";
import { Product } from "../models/product.js";
import ErrorHandler from "../utilis/utility-class.js";
import { rm } from "fs";
export const newProduct = TryCatch(async (req, res, next) => {
    const { name, price, stock, category } = req.body;
    const photo = req.file;
    if (!photo)
        return next(new ErrorHandler("please Add Photo", 400));
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
});
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
    const product = await Product.findById(id);
    if (!product)
        return next(new ErrorHandler("Invalid Id!", 400));
    const photo = req.file;
    if (photo) {
        rm(product.photo, () => {
            console.log("Old photo Delete");
        });
        product.photo = photo.path;
    }
    if (name)
        product.name = name;
    if (price)
        product.price = price;
    if (stock)
        product.stock = stock;
    if (category)
        product.category = category;
    await product.save();
    res.json({
        success: true,
        message: "Product Update Successful !",
    });
});
export const deleteProduct = TryCatch(async (req, res, next) => {
    const product = await Product.findById(req.params.id);
    if (!product)
        return next(new ErrorHandler("Invalid Id!", 400));
    rm(product.photo, () => {
        console.log("photo Delete");
    });
    await product.deleteOne();
    res.json({
        success: true,
        product,
        message: "Product Delete Successful!",
    });
});
export const productsFilter = TryCatch(async (req, res, next) => {
    const { search, price, category } = req.query;
    console.log(search);
    const product = await Product.find({
        name: {
            $regex: search,
            $options: "i"
        },
        price: {
            $lte: Number(price)
        },
        category
    });
    res.json({
        success: true,
        product,
        message: "Product Fetch Successful !",
    });
});
