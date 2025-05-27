import { Request, Response, NextFunction } from "express";

export function doctorSignoffCheck(req: Response, res: Response, next: NextFunction) {
  if (!req.body.doctorSigned) {
    return res
      .status(400)
      .json({ error: "Doctor sign-off required before discharge." });
  }
  req.dischargeLog.push({
    step: "doctorSignoff",
    time: new Date().toISOString(),
  });
  next();
}
