import express from "express";
import contactRoutes from "./routes/contactRoute";
import connectDB from "./utils/db";
import dotenv from "dotenv";
import cors from "cors";
import userRoutes from "./routes/userRoutes";
import productRoutes from "./routes/productRoutes";

dotenv.config();
const app = express();
const port = process.env.PORT;

app.use(cors());

app.use(express.json());
app.use("/api/product", productRoutes);
app.use("/api/users", userRoutes);
app.use("/api/contact", contactRoutes);

connectDB();

app.listen(port, () => {
  console.log(`Server running on port ${port}`);
});
