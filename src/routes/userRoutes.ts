
import express from "express";
import { getAllUsers, getUserById, loginUser, registerUser , getMyData} from "../controllers/userController";
import { verifyToken } from "../middleware/authMiddleware";


const router = express.Router();
router.get("/me", verifyToken, getMyData)
router.post("/register", registerUser);
router.post("/login", loginUser);
router.get("/users/:id", verifyToken, getUserById);
router.get("/users", verifyToken, getAllUsers);

export default router;