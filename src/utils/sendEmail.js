const nodemailer = require("nodemailer");

require("dotenv").config(); 

const transporter = nodemailer.createTransport({
    service: "gmail", 
    auth: {
        user: process.env.EMAIL_USER, 
        pass: process.env.EMAIL_PASS, 
    },
});

const sendEmail = async (to, subject, htmlContent=htmlContent) => {
    try {
        let info = await transporter.sendMail({
            from: transporter.auth.user,
            to: to, 
            subject: subject, 
            html: htmlContent, 
        });

        console.log("Email sent: %s", info.messageId);
    } catch (error) {
        console.log("Error sending email:", error);
    }
};

const htmlContent = `
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta http-equiv="X-UA-Compatible" content="IE=edge">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <style>
        body {
            font-family: Arial, sans-serif;
            background-color: #f4f4f4;
            padding: 20px;
        }
        .email-container {
            background-color: white;
            padding: 20px;
            border-radius: 10px;
            max-width: 600px;
            margin: 0 auto;
        }
        .header {
            background-color: #4CAF50;
            color: white;
            padding: 10px;
            text-align: center;
        }
        .content {
            margin-top: 20px;
            text-align: center;
        }
        .footer {
            margin-top: 20px;
            text-align: center;
            font-size: 12px;
            color: #666;
        }
        .btn {
            background-color: #4CAF50;
            color: white;
            padding: 10px 20px;
            text-decoration: none;
            border-radius: 5px;
        }
    </style>
</head>
<body>
    <div class="email-container">
        <div class="header">
            <h1>Task Tracker</h1>
        </div>
        <div class="content">
            <h2>Welcome to Task Tracker</h2>
            <p>Your account has been created successfully!</p>
            <a href="https://tasktracker.com" class="btn">Get Started</a>
        </div>
        <div class="footer">
            <p>&copy; 2024 Task Tracker. All rights reserved.</p>
        </div>
    </div>
</body>
</html>
`;

module.exports = sendEmail;
