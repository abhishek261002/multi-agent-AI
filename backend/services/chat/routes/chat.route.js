import express from "express";
import { createConversation ,getConversations, updateConversation, getMessages, saveMessage} from "../controllers/chat.controller.js";

const router = express.Router();

router.get("/create-conversation", createConversation);
router.get("/get-conversations", getConversations);
router.post("/update-conversation", updateConversation);
router.get("/get-messages/:conversationId", getMessages);
router.post("/save-message", saveMessage);

export default router;