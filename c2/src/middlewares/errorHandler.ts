import { Request, Response, NextFunction } from "express";

export function errorHandler(
  err: any,
  req: Request,
  res: Response,
  next: NextFunction
) {
  console.error("Discharge log:", req.dischargeLog);
  res.status(500).json({ error: err.message || "Internal server error" });
}
