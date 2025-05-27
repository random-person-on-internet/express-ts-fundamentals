import express from "express";
import { applicationValidation } from "../validators/application.validator";
import { submitApplication } from "../controllers/application.controller";

const router = express.Router();

router.post("/apply", applicationValidation, submitApplication);

export default router;
