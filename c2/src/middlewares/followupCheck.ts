import { Request, Response, NextFunction } from "express";

export function followupCheck(req: Request, res: Response, next: NextFunction) {
  if (!req.body.followupScheduled) {
    return res
      .status(400)
      .json({ error: "Follow-up appointment must be scheduled." });
  }
  req.dischargeLog.push({
    step: "followupCheck",
    time: new Date().toISOString(),
  });
  next();
}
