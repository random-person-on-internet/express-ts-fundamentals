import { Request, Response, NextFunction } from "express";

export function logDischargeRequest(req: Request, res: Response, next: NextFunction) {
  req.dischargeLog = req.dischargeLog || [];
  req.dischargeLog.push({
    step: "requestReceived",
    time: new Date().toISOString(),
  });
  next();
}
