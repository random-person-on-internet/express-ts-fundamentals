import { Request, Response, NextFunction } from "express";

export function pharmacyReview(req: Request, res: Response, next: NextFunction) {
  if (!req.body.pharmacyChecked) {
    return res
      .status(400)
      .json({ error: "Pharmacy review required before discharge." });
  }
  req.dischargeLog.push({
    step: "pharmacyReview",
    time: new Date().toISOString(),
  });
  next();
}
