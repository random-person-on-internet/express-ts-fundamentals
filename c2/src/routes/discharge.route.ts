import { Router } from "express";
import { doctorSignoffCheck } from "../middlewares/doctorSignoffCheck";
import { pharmacyReview } from "../middlewares/pharmacyReviews";
import { followupCheck } from "../middlewares/followupCheck";
import { insuranceApprovalCheck } from "../middlewares/insuranceApprovalCheck";

const router = Router();

router.post(
  "/discharge",
  insuranceApprovalCheck,
  doctorSignoffCheck,
  pharmacyReview,
  followupCheck,
  (req, res) => {
    req.dischargeLog.push({
      step: "dischargeComplete",
      time: new Date().toISOString(),
    });
    res.json({
      status: "Discharge complete",
      patient: req.body.patientName,
      log: req.dischargeLog,
    });
  }
);

export default router;
