import { Router } from "express";
import { submitContactForm, getAllContactMessages } from "../controllers/contactController";  

const router: Router = Router();

router.post("/contact", submitContactForm);
router.get("/contact/messages", getAllContactMessages);

export default router;
