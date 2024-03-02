import { Request, Response, NextFunction } from "express";
import ErrorHandler from "../../utilis/utility-class.js";
import { ControllerType } from "../../types/type.js";

export const errorMiddleware = (
  err: ErrorHandler,
  req: Request,
  res: Response,
  next: NextFunction
) => {
  err.message ||= "Internal Server Error";
  err.statusCode ||= 500;
  return res.status(err.statusCode).json({
    success: false,
    message: err.message,
  });
};

export const TryCatch =
  (fun: ControllerType) =>
  (req: Request, res: Response, next: NextFunction) => {
    return Promise.resolve(fun(req, res, next)).catch(next);
  };
