import Conversation from "../models/conversation.model.js";
import Message from "../models/message.model.js";
export const createConversation = async (req, res) => {
    try {
        const userId = req.headers["x-user-id"];
        console.log(userId, " userId from header");
        const conversation = await Conversation.create({
            userId: userId,
        })

        return res.status(201).json({ message: "Conversation created successfully", conversation });
    } catch (error) {
        console.error("Error creating conversation:", error);
        return res.status(500).json({ message: "Error creating conversation" });
    }
}

export const getConversations = async (req, res) => {
    try {
        const userId = req.headers["x-user-id"];
        console.log(userId, " userId from header");
        const conversation = await Conversation.find({
            userId: userId,
        }).sort({updatedAt: -1});

        return res.status(201).json(conversation);
    } catch (error) {
        console.error("Error creating conversation:", error);
        return res.status(500).json({ message: "Error creating conversation" });
    }
}
export const updateConversation = async (req, res) => {
    try {
       const {id,title} = req.body;

        const conversation = await Conversation.findByIdAndUpdate(
            id,
            { title },
        );

        return res.status(201).json(conversation);
    } catch (error) {
        console.error("Error creating conversation:", error);
        return res.status(500).json({ message: "Error creating conversation" });
    }
}
export const saveMessage = async (req, res) => {
    try {
       const {conversationId, role,content} = req.body;
       if(!conversationId || !role || !content){
        return res.status(400).json({ message: "conversationId, role and content are required" });
       }
       const message = await Message.create({
        conversationId, content, role
       })

       return res.status(201).json({ message: "Message saved successfully", message });
    } catch (error) {
        console.error("Error creating conversation:", error);
        return res.status(500).json({ message: "Error creating conversation" });
    }
}

export const getMessages = async (req, res) => {
    try {
       const messages = await Message.find({
        conversationId : req.params.conversationId, 
       });

       return res.status(201).json(messages);
    } catch (error) {
        console.error("Error creating conversation:", error);
        return res.status(500).json({ message: "Error creating conversation" });
    }
}

