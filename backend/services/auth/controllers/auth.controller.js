import { randomUUID } from "crypto";
import { getAuth } from "firebase-admin/auth";
import app from "../config/firebase.js";
import User from "../models/user.models.js";
import redis from "../../../shared/redis/redis.js";
export const login = async (req, res) => {
    try {
        const  { token } = req.body;
        const decodedToken = await getAuth(app).verifyIdToken(token);
        let user = await User.findOne({ firebaseUid: decodedToken?.uid });

        if (!user) {
            user = await User.create({
                firebaseUid: decodedToken?.uid,
                name : decodedToken?.name,
                email : decodedToken?.email,
                avatar : decodedToken?.picture
            })
        } 
        const sessionId = randomUUID();
        await redis.set(`session-${sessionId}`, JSON.stringify({
            userId : user._id,
            name: user.name, 
            email: user.email, 
            avatar: user.avatar
        }), 'EX',  60 * 60 * 24 * 7); // 7 days
        res.cookie("sessionId", sessionId, {
            httpOnly: true,
            secure : false,
            sameSite : "strict",
            maxAge : 1000 * 60 * 60 * 24 * 7 // 7 days
        })
        return res.status(200).json({ message: "Login successful", user });
    }
    catch (error) {
        console.error("Error occurred while verifying token or finding user:", error);
        res.status(500).json({ error: "Internal server error" });
    }
}

export const logout = async (req, res) => {
    try {
        const sessionId = req.cookies?.session;
        console.log("Session ID from cookie:", sessionId);
        await redis.del(`session-${sessionId}`);
        res.clearCookie("session");
        return res.status(200).json({ message: "Logout successful" });
    } catch (error) {
        console.error("Error occurred while logging out:", error);
        res.status(500).json({ message : `Internal server error ${error}` });
    }
}