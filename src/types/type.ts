import { Request, NextFunction, Response } from "express";
export interface newUserRequest {
  _id: String;
  name: String;
  email: String;
  photo: String;
  role: "admin" | "user";
  gender: "male" | "female";
  dob: number;
  createdAt: Date;
  updatedAt: Date;
  age: number;
}

export type ControllerType = (
  req: Request,
  res: Response,
  next: NextFunction
) => Promise<void | Response<any, Record<string, any>>>;

export interface NewProductRequest {
  name: String;
  email: String;
  photo: String;
  price: number;
  stock: number;
  category: String;
}

export type SearchRequestParams = {
  search?: String;
  price?: String;
  category?: String;
  sort?: String;
  page?: String;
};

export type BaseQuery = {
  name?: {
    $regex?: String;
    $options: String;
  };
  price?: {
    $lte: Number;
  };
  category?: String;
};
