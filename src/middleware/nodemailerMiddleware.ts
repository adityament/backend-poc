import nodemailer from "nodemailer";

interface EmailOptions {
  subject: string;
  text: string;
}

export const sendEmail = async ({
  subject,
  text,
}: EmailOptions): Promise<void> => {
  try {
    const transporter = nodemailer.createTransport({
      service: "gmail",
      auth: {
        user: process.env.EMAIL_USER,
        pass: process.env.EMAIL_PASS,
      },
    });

    await transporter.sendMail({
      from: process.env.EMAIL_USER,
      to: process.env.RECEIVER_EMAIL,
      subject,
      text,
    });
  } catch (error) {
    console.error("Error sending email:", error);
    throw error;
  }
};
