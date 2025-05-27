import { Request, Response, NextFunction } from "express";

export function insuranceApprovalCheck(
  req: Request,
  res: Response,
  next: NextFunction
) {
  if (!req.body.insuranceApproved) {
    return res
      .status(403)
      .json({ error: "Insurance approval required before discharge." });
  }

  req.dischargeLog.push({
    step: "insuranceApproval",
    time: new Date().toISOString(),
  });
}
