import { getAuth } from "firebase-admin/auth";
import app from "../config/firebase.js";
import User from "../models/user.models.js";
export const login = async (req, res) => {
    try {
        const  { token } = req.body;
        const decodedToken = await getAuth(app).verifyIdToken(token);
        let user = await User.findOne({ firebaseUid: decodedToken?.uid });

        if (!user) {
            user = await User.create({
                firebaseUid: decodedToken?.uid,
                name : decodedToken?.displayName,
                email : decodedToken?.email,
                avatar : decodedToken?.photoURL
            })
        } 
        const sessionId = crypto.randomUUID();
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