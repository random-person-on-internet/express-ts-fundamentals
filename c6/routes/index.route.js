import { Router } from "express";

const router = Router();

router.get("/sync-error", (req, res, next) => {
  throw new Error("Sync error occured");
});

router.get("/async-error", async (req, res, next) => {
  try {
    await Promise.reject(new Error("Async error occured"));
  } catch (err) {
    next(err);
  }
});

router.get("/manual-error", (req, res, next) => {
  const err = new Error("Manualy triggered error");
  next(err);
});

export default router;
