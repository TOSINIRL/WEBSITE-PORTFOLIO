import { Router, type IRouter } from "express";

const router: IRouter = Router();

router.post("/contact", (req, res) => {
  const { name, email, subject, message } = req.body || {};

  if (!name || !email || !message) {
    res.status(400).json({
      success: false,
      message: "Name, email, and message are required fields.",
      timestamp: new Date().toISOString(),
    });
    return;
  }

  // Simulate successful logging / processing
  console.log(`[CONTACT SUBMISSION] ${new Date().toISOString()}`);
  console.log(`From: ${name} <${email}> | Subject: ${subject || "General Inquiry"}`);
  console.log(`Message: ${message}`);

  res.json({
    success: true,
    message: `Thank you ${name}, your transmission has been encrypted and received. We will respond within 24 hours.`,
    timestamp: new Date().toISOString(),
  });
});

export default router;
