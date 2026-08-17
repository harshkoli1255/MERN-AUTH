import jwt from 'jsonwebtoken';


export const verifyToken = (req, res, next) => {
    const {token} = req.cookies;

    if(!token) {
        return res.status(401).json({
            success: false,
            message: "Unauthorized - no token provided",
        });
    }

    try {
        const userToken = jwt.verify(token, process.env.JWT_SECRET);
        if(!userToken) {
            return res.status(401).json({
                success: false,
                message: "Unauthorized - invalid token",
            });
        }
        req.userID = userToken.userID;
        next();
        
    } catch(error) {
        res.status(500).json({
            success: false,
            message: error.message,
        })
    }
}