// In routes file

import { Router, ErrorRequestHandler } from "express";
import {
  createProduct,
  getAllProducts,
  getProductById,
  updateProductById,
  deleteProductById, // Add this import
} from "../controllers/productController";
import multer from "multer";
import fs from "fs";
import path from "path";

const uploadDir = path.join(__dirname, "../uploads");
if (!fs.existsSync(uploadDir)) {
  fs.mkdirSync(uploadDir, { recursive: true });
}

const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, uploadDir);
  },
  filename: (req, file, cb) => {
    cb(null, `${Date.now()}-${file.originalname}`);
  },
});

const upload = multer({ storage }).fields([{ name: "images", maxCount: 4 }]);

const errorHandler: ErrorRequestHandler = (err, req, res, next) => {
  if (err instanceof multer.MulterError) {
    res.status(400).json({ error: err.message });
  } else if (err) {
    res.status(500).json({ error: "File upload error" });
  } else {
    next();
  }
};

const router: Router = Router();

router.post("/product", upload, createProduct);
router.get("/products", getAllProducts);
router.get("/product/:id", getProductById);
router.put("/product/:id", updateProductById);
router.delete("/product/:id", deleteProductById);

export default router;