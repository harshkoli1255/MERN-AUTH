import { EMAIL_VERIFY_TEMPLATE, EMAILVERIFIED, PASSWORD_RESET_TEMPLATE } from "./emailTamplates.js";
import { transporter } from "./nodemailer.config.js"
export const sendVerificationEmail = async (userEmail, verificationToken) => {
    try {
        const mailOptions = {
            from: process.env.SENDER_EMAIL,
            to: userEmail, 
            subject: "Verify your email",
            html: EMAIL_VERIFY_TEMPLATE.replace("{{email}}", userEmail).replace('{{otp}}', verificationToken),
            // text: `here is your verification code ${verificationToken} for email ${userEmail}`,
        }
        const info = await transporter.sendMail(mailOptions);
        console.log("Mail accepted:", info.accepted);
        console.log("Mail rejected:", info.rejected);
        console.log("Message ID:", info.messageId);
    } 
    catch(error) {
        console.error("Email sending failed:", error);
        throw error;
    }
}


export const EmailVerified = async (userEmail) => { 
    try {
        const mailOptions = {
            from : process.env.SENDER_EMAIL,
            to: userEmail,
            subject: "Your Account is now Verified",
            html: EMAILVERIFIED.replace("{{email}}", userEmail),
        };

        await transporter.sendMail(mailOptions);
    }
    catch(error) {
        console.error("Verified-email notification failed:", error);
        throw error;
    }
}

export const sendPasswordRestEmail = async (userEmail, resetUrl) => {
    try {
            const mailOptions = {
            from : process.env.SENDER_EMAIL,
            to: userEmail,
            subject: "Your Account is now Verified",
            html: PASSWORD_RESET_TEMPLATE.replace("{{email}}", userEmail).replace("{{otp}}", resetUrl),
        };

        await transporter.sendMail(mailOptions);
    } catch(error) {
        console.error("Password reset email failed:", error);
        throw error;
    }
}
