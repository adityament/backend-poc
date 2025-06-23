import { Request, Response } from "express";
import { v2 as cloudinary } from "cloudinary";

import dotenv from "dotenv";
import asyncHandler from "express-async-handler";
import Product from "../models/productModel";
dotenv.config();

cloudinary.config({
  cloud_name: process.env.CLOUD_NAME,
  api_key: process.env.CLOUDINARY_KEY,
  api_secret: process.env.CLOUDINARY_SECRET,
});
const createProduct = asyncHandler(async (req: Request, res: Response) => {
  const {
    name,
    dimension,
    address,
    crowded,
    period,
    restrictions,
    position,
    rate,
    description,
    qualityOfWall,
  } = req.body;

  if (!req.files || !("images" in req.files)) {
    res.status(400).json({ error: "Images are required!" });
    return;
  }

  const imageFiles = (
    req.files as { [fieldname: string]: Express.Multer.File[] }
  ).images;

  const imageUrls = await Promise.all(
    imageFiles.map(async (file) => {
      const uploadResult = await cloudinary.uploader.upload(file.path);
      return uploadResult.secure_url;
    })
  );

  const newProduct = new Product({
    name,
    url: imageUrls,
    dimension,
    address,
    crowded,
    period,
    restrictions,
    position,
    rate,
    description,
    qualityOfWall,
  });

  await newProduct.save();
  res
    .status(201)
    .json({ message: "Product created successfully!", product: newProduct });
});

const getAllProducts = async (req: Request, res: Response): Promise<void> => {
  try {
    const products = await Product.find();
    res.status(200).json(products);
  } catch (error) {
    res.status(400).json({ error: (error as Error).message });
  }
};

const getProductById = async (req: Request, res: Response): Promise<void> => {
  try {
    const product = await Product.findById(req.params.id);
    if (!product) {
      res.status(404).json({ error: "Product not found" });
      return;
    }
    res.status(200).json(product);
  } catch (error) {
    res.status(400).json({ error: (error as Error).message });
  }
};

const updateProductById = async (
  req: Request,
  res: Response
): Promise<void> => {
  try {
    const updatedProduct = await Product.findByIdAndUpdate(
      req.params.id,
      req.body,
      {
        new: true,
        runValidators: true,
      }
    );

    if (!updatedProduct) {
      res.status(404).json({ error: "Product not found" });
      return;
    }

    res.status(200).json(updatedProduct);
  } catch (error) {
    res.status(400).json({ error: (error as Error).message });
  }
};// In productController.ts (add this after updateProductById)

const deleteProductById = asyncHandler(async (req: Request, res: Response) => {
  try {
    const product = await Product.findById(req.params.id);
    
    if (!product) {
      res.status(404).json({ error: "Product not found" });
      return;
    }

    // Delete images from Cloudinary
    if (product.url && product.url.length > 0) {
      await Promise.all(
        product.url.map(async (imageUrl) => {
          const publicId = imageUrl.split('/').pop()?.split('.')[0]; // Extract public ID from URL
          if (publicId) {
            await cloudinary.uploader.destroy(publicId);
          }
        })
      );
    }

    
    await Product.findByIdAndDelete(req.params.id);

    res.status(200).json({ 
      message: "Product deleted successfully",
      productId: req.params.id 
    });
  } catch (error) {
    res.status(400).json({ error: (error as Error).message });
  }
});


export { 
  createProduct, 
  getAllProducts, 
  getProductById, 
  updateProductById,
  deleteProductById 
};