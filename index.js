require("dotenv").config();
const express = require("express");
const cors = require("cors");
const nodemailer = require("nodemailer");

const app = express();

app.use(express.json());
app.use(cors());

const transporter = nodemailer.createTransport({
  service: "hotmail",
  // host: process.env.SMTP_HOST,
  // port: +process.env.SMTP_PORT,
  // secure: Boolean(process.env.SMTP_SECURE), // Use `true` for port 465, `false` for all other ports
  auth: {
    user: process.env.SMTP_USER,
    pass: process.env.SMTP_PASSWORD,
  },
});

async function sendMail(to, subject, text, html) {
  await transporter.sendMail({
    from: "Mahmoud Ahmed, <mahmoudahmedawad2008@outlook.com>",
    to,
    subject,
    text,
    html,
  });
}

app.post("/contact", async (req, res) => {
  await sendMail(
    "mahmoudahmedawad2008@outlook.com",
    "Contact",
    `Name: ${req.body.firstName} ${req.body.lastName}
    Email: ${req.body.email}
    Message: ${req.body.message}`,
    `<div style="background-color: #eee; padding: 10px;">
      <h3>Name: ${req.body.firstName} ${req.body.lastName}</h3>
      <h3>Email: ${req.body.email}</h3>
    </div>
    <pre>${req.body.message}</pre>`
  ).catch(console.error);
  res.status(201).json({ message: "Sended" });
});

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => console.log(`App Running On Port: ${PORT}`));
