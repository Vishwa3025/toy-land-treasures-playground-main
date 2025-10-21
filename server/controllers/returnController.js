const nodemailer = require("nodemailer");

// Return Request Controller
exports.requestReturn = async (req, res) => {
  try {
    const { products, reason, email } = req.body;

    if (!products || !reason) {
      return res
        .status(400)
        .json({ message: "Products and reason are required" });
    }

    // Get logged-in user's email from auth middleware
    const userEmail = email;
    if (!userEmail) {
      return res.status(400).json({ message: "User email not found" });
    }

    // Create transporter
    let transporter = nodemailer.createTransport({
      service: "gmail",
      auth: {
        user: process.env.EMAIL_USER, // This will still authenticate using your Gmail
        pass: process.env.EMAIL_PASS,
      },
    });

    console.log(userEmail);
    
    // Prepare email
    let mailOptions = {
      from: `"LittledreamersToys Returns" <${process.env.EMAIL_USER}>`,
      replyTo: userEmail,
      to: "xxx@gmail.com",
      subject: "Return Request Received",
      text: `A customer (${userEmail}) has requested a return.\n\nProducts: ${products}\n\nReason: ${reason}`,
    };

    // Send email
    await transporter.sendMail(mailOptions);

    res.json({ message: "Return request sent successfully" });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Server Error", error });
  }
};
