import { Schema, model, Document } from "mongoose";

interface IProduct extends Document {
  name: string;
  url: string[]; 
  address?: string;
  dimension?: string;
  rate?: number;
  crowded?: string;
  restrictions?: string[];
  position?: string;
  period?: string;
  description:string;
  qualityOfWall:string;
 
}

const productSchema = new Schema<IProduct>({
  name: { type: String, required: true },
  url: { type: [String], required: true }, 
  description: { type: String, required: true },
  qualityOfWall: { type: String, required: true }, 
  address: { type: String },
  dimension: { type: String },
  rate: { type: Number, default: 0 },
  crowded: { type: String },
  restrictions: { type: [String] },
  position: { type: String },
  period: { type: String },
});

const Product = model<IProduct>("Product", productSchema);

export default Product;
