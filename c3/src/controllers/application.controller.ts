import { Request, Response } from "express";
import { validationResult } from "express-validator";

export const submitApplication = (req: Request, res: Response) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() });
  }

  // If we reach here, the application is valid!
  res.json({ status: "Application received!" });
};
