import { User } from "../../models/user.js";
import ErrorHandler from "../../utilis/utility-class.js";
import { TryCatch } from "../error/error.js";

export const adminOnly =  TryCatch(async (req, res, next) => {
    const { id } = req.query;

    console.log(id, "9999999999");

    if (!id) return next(new ErrorHandler("Please Login First", 401));
    const user = await User.findById(id);
    if (!user) return next(new ErrorHandler("Unauthorized User", 401));

    if (user.role !== "admin")
      return next(new ErrorHandler("Access restricted to admins only", 401));

    next();
  });
