import { NextFunction, Request, RequestHandler, Response } from "express";
import { validationResult } from "express-validator";

export const validateRequest = async (
  req: Request,
  res: Response,
  next: NextFunction
): Promise<void> => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    res.status(400).json({ errors: errors.array() });
    return;
  }
  next();
};
