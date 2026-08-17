import jwt from "jsonwebtoken";

export const generateTokenAndSetCookie = (res, userID) => {
    const token = jwt.sign({userID}, process.env.JWT_SECRET, {expiresIn: '7d'});
    res.cookie('token', token, {
        httpOnly: true,
        maxAge: 7 * 24 * 60 * 60 * 1000,
        secure: process.env.NODE_ENV == 'production',
        sameSite: process.env.NODE_ENV == 'production' ? "none" : "strict"
    },);
    return token;
}
