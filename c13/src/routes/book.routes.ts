import express from "express";
import {
  createBook,
  deleteBook,
  getBookById,
  getBooks,
  updateBook,
} from "../controllers/book.controller";
import { body, param } from "express-validator";
import { validateRequest } from "../middlewares/validation.middleware";

const router = express.Router();

router.get("/", getBooks);
router.get("/:id", param("id").isMongoId(), validateRequest, getBookById);

router.post(
  "/",
  body("title").isString().notEmpty(),
  body("author").isString().notEmpty(),
  body("year").isNumeric(),
  validateRequest,
  createBook
);

router.put(
  "/:id",
  param("id").isMongoId(),
  body("title").isString().optional(),
  body("author").optional().isString(),
  body("year").optional().isNumeric(),
  validateRequest,
  updateBook
);

router.delete("/:id", param("id").isMongoId(), validateRequest, deleteBook);

export default router;
