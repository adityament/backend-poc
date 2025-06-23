import { Request, Response } from "express";
import { sendEmail } from "../middleware/nodemailerMiddleware";
import Contact from "../models/contactModel";


export const submitContactForm = async (req: Request, res: Response): Promise<void> => {
    const { name, email, subject, message } = req.body;

    if (!name || !email || !subject || !message) {
        res.status(400).json({ message: "All fields (name, email, subject, message) are required." });
        return;
    }

    try {
        const newContactMessage = new Contact({
            name,
            email,
            subject,
            message,
        });

        await newContactMessage.save();

        // Email bhejna
        const emailContent = `
            New contact form submission:
            Name: ${name}
            Email: ${email}
            Subject: ${subject}
            Message: ${message}
        `;

        await sendEmail({
            subject: `New Contact Form Submission: ${subject}`,
            text: emailContent,
        });

        res.status(201).json({ message: "Contact message sent successfully" });
    } catch (error) {
        res.status(500).json({ message: "Error submitting contact form", error });
    }
};


export const getAllContactMessages = async (req: Request, res: Response): Promise<void> => {
    try {
        const contactMessages = await Contact.find();
        res.status(200).json({ contactMessages });
    } catch (error) {
        res.status(500).json({ message: "Error retrieving contact messages", error });
    }
};
