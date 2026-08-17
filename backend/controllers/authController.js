import User from '../models/User.js'
import bcryptjs from 'bcryptjs';
import jwt from 'jsonwebtoken';
import { generateTokenAndSetCookie } from '../utils/generateTokenAndSetCookie.js';
import { EmailVerified, sendPasswordRestEmail, sendVerificationEmail } from '../mailService/emails.js';
import crypto, { hash } from 'crypto';



export const generateAndSendVerificationCode = async (req, res) => {
    const token = req.cookies.token;
    console.log(token);
    if(!token) {
        return res.status(400).json({
            success: false,
            message: "invalid user token",
        })
    }
    try {
        const {userID} = await jwt.verify(token, process.env.JWT_SECRET);
        const user = await User.findById(userID);
    
        if(!user) {
            return res.status(400).json({
                success: false,
                message: "user doesn't exists",
            })
        }
        if(!user.isVerified) {
            user.verificationToken = Math.floor(100000 + Math.random()*900000).toString();
            user.verificationTokenExpiresAt =  Date.now() + 24 * 60 * 60 * 1000,
            await user.save();
            await sendVerificationEmail(user.email, user.verificationToken);
            return res.status(200).json({
                success: true,
                message: "Verification Code is sent successfully",
                user: {
                    ...user._doc,
                    password: null,
                }
            })
        }
    } catch(error) {
        res.status(400).json({
            success: false,
            message: error.message,
        })
    }
}

export const signup = async (req, res) => {
    const {name, email, password } = req.body;
    try {
        if(!name || !email || !password) {
            throw new Error("All fields are requied");
        }
        // check if the user is already exists
        const userAlreadyExists = await User.findOne({email});
        if(userAlreadyExists) {
            return res.status(400).json({success: false, message: "User already exists"});
        }
        const hashedPassword = await bcryptjs.hash(password, 10);
        const verificationToken = Math.floor(100000 + Math.random()*900000).toString();
        const user = new User({
            name,
            email,
            password: hashedPassword,
            verificationToken,
            verificationTokenExpiresAt: Date.now() + 24 * 60 * 60 * 1000, // expire in 1 day
        });
        await user.save();
        // jwt
        generateTokenAndSetCookie(res, user._id);
        await sendVerificationEmail(user.email, verificationToken);
        res.status(201).json({
            success: true,
            message: "User Created Successfuly",
            user: {
                ...user._doc,
                password: null,
            }
        })
    }catch(error) {
        console.log(error);
        res.status(400).json({
            success: false,
            message: error.message
        })
    }
}

export const verifyEmail = async (req, res) => {
    try {
        const {code} = req.body;
        const userToken = req.cookies.token;
        
        if (!code || !userToken) {
            return res.status(400).json({
                success: false,
                message: "Verification code and login token are required",
            });
        }
        const {userID} = jwt.verify(userToken, process.env.JWT_SECRET);
        const user = await User.findById(userID);

        if(!user) {
            return res.status(400).json({
                success: false,
                message: "User does not exists"
            });
        }
    
        if(user.isVerified) {
            return res.status(400).json({
                success: false,
                message: "Your Account is already verified",
            });
        }

        if(!user.verificationTokenExpiresAt || Date.now() > user.verificationTokenExpiresAt) {
            return res.status(400).json({
                success: false,
                message: "The Verification code is expired",
            });
        }

        if(user.verificationToken !== code) {
            return res.status(400).json({
                success: false,
                message: "Your Verification Code is invalid",
            });
        }

        // Token is valid, proceed with verification
        await EmailVerified(user.email);
        user.isVerified = true;
        user.verificationToken = undefined;
        user.verificationTokenExpiresAt = undefined;
        await user.save();
        
        return res.status(200).json({
            success: true,
            message: "Your Account is Verified",
            user: {
                ...user._doc,
                password: undefined,
            }
        });
    } catch(error) {
        return res.status(401).json({
            success: false,
            message: "Invalid or expired login token",
        })
    }
}
export const login = async (req, res) => {
    const {email, password} = req.body;
    try {
        if(!email || !password) {
           return res.status(400).json({
            success: false,
            message: "Missing details",
           });
        }

        const user = await User.findOne({email});
        if(!user) {
            return res.status(400).json({
                success: false,
                message: "Invalid credentials"
            });
        }

        const isPasswordValid = await bcryptjs.compare(password, user.password);
        if(!isPasswordValid) {
            return res.status(400).json({
                success: false,
                message: "Invalid credentials"
            });
        }

        generateTokenAndSetCookie(res, user._id);

        user.lastLogin = new Date();

        await user.save();

        return res.json({
            success: true,
            message: "Logged in successfully",
            user: {
                ...user._doc,
                password: undefined,
            }
        })
    } catch(error) {
        res.status(400).json({
            success: false,
            message: error.message,
        })
    }
}
export const logout = async (req, res) => {
    res.clearCookie("token");
    res.status(200).json({
        success: true,
        message: "Logged out successfully",
    })
}

export const forgotPassword = async (req, res) => {
    const {email} = req.body;

    if(!email) {
        return res.status(400).json({
            success: false,
            message: "Missing Details",
        })
    }

    try {
        const user = await User.findOne({email});
        if(!user) {
            return res.status(400).json({
                success: false,
                message: "user not found",
            })
        }
        // generate the reset token
        const resetToken = crypto.randomBytes(32).toString("hex");
        user.resetPasswordToken = resetToken;
        user.resetPasswordExpiresAt = Date.now() + 1 * 24 * 60 * 60 * 1000;
        await user.save();
        await sendPasswordRestEmail(email, `${process.env.CLIENT_URL}/reset-password/${resetToken}`);
        res.status(201).json({
            success: true,
            message: "Password reset link sent to your email",
        })
    } catch(error) {
        res.status(400).json({
            success: false,
            message: error.message,
        })
    }
}

export const resetPassword = async (req, res) => {
    try {
        const {token} = req.params;
        const {password} = req.body;
        if(!token || !password) {
            return res.status(400).json({
                success: false,
                message: "Missing Details",
            })
        }
        const user = await User.findOne({resetPasswordToken: token});
        if(!user) {
            res.status(400).json({
                success: false,
                message: "Invalid password reset link",
            })
        }     
        if(!user.resetPasswordToken || Date.now() > user.resetPasswordExpiresAt) {
            return res.status(400).json({
                success: false,
                message: "Token is expired",
            })
        }

        const hashedPassword = await bcryptjs.hash(password, 10);
        user.password = hashedPassword;
        user.resetPasswordToken = undefined;
        user.resetPasswordExpiresAt = undefined;
        user.save();
        res.status(200).json({
            success: true,
            message: "Password reset successfully",
        })
    }
    catch(error) {
        res.status(400).json({
            success: false,
            message: error.message,
        })
    }
}


export const checkAuth = async (req, res) => {
    try {
        const user = await User.findById(req.userID);
        if(!user) {
            return res.status(400).json({
                success: false,
                message: "User not found",
            })
        }

        res.status(200).json({
            success: true,
            user : {...user._doc, password: undefined},
        })

    } catch(error) {
        res.status(400).json({
            success: false,
            message: error.message,
        })
    }
}
