import { NextFunction, Request } from "express";
import { Response } from "express";
import { User } from "../models/user.js";
import { newUserRequest } from "../types/type.js";
import { TryCatch } from "../middleware/error/error.js";
import ErrorHandler from "../utilis/utility-class.js";

export const newUser = TryCatch(
  async (
    req: Request<{}, {}, newUserRequest>,
    res: Response,
    next: NextFunction
  ) => {
    const { _id, name, email, photo, gender, dob } = req.body;

    let user = await User.findById(_id);

    if (user) {
      return res.json({
        success: true,
        message: `Welcome ${user.name}`,
      });
    }
    if (!_id || !name || !email || !photo || !gender || !dob) {
      return next(new ErrorHandler("Required All Fields", 404));
    }

    const new_user = await User.create({
      _id,
      name,
      email,
      photo,
      gender,
      dob: new Date(dob),
    });

    return res.status(200).json({
      success: true,
      message: `Welcome ${new_user.name}`,
    });
  }
);

export const getAllUsers = TryCatch(async (req, res) => {
  // const fieldsToRemove = ['name', 'email', 'gender'];
  // const projection = fieldsToRemove.reduce((acc:any, field) => {
  //   acc[field] = 0;
  //   return acc;
  // }, {});
  // const findUser = await User.find({}).select(projection)

  const findUser = await User.find({});
  res.status(200).json({
    success: true,
    findUser,
  });
});

export const getUser = TryCatch(async (req, res, next) => {
  const { id } = req.params;
  const user = await User.findById(id);
  if (!user) return next(new ErrorHandler("Invalid! Id", 400));
  res.status(200).json({
    message: "user details fetch Successful",
    user,
  });
});

export const deleteUser = TryCatch(async (req, res, next) => {
  const { id } = req.params;
  const user = await User.findById(id);
  if (!user) return next(new ErrorHandler("Invalid! Id", 400));
  await user.deleteOne();
  res.status(200).json({
    message: "User Delete Successful",
    success: true,
  });
});
