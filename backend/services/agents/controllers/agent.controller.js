import axios from "axios";
import graph from "../graph/graph.js";
import { addMessages } from "../config/memory.js";

export const agent = async (req, res) => {
    try {
        console.log("DATA RECEIVED FROM FRONTEND:", req.body);
        const { prompt, conversationId } = req.body;
        
        const chat_service_url = process.env.CHAT_SERVICE || "http://localhost:5173";
        
        // --- FIX HERE: Removed the leading structural curly brace ---
        await axios.post(`${chat_service_url}/save-message`, {
            conversationId : conversationId,
            role: "user", 
            content: prompt
        });

        const result = await graph.invoke({
            prompt,
            conversationId
        });

        const response = result.aiResponse;
        await addMessages(conversationId,"user",prompt)
         await addMessages(conversationId,"assistant",response)
        await axios.post(`${chat_service_url}/save-message`, {
            conversationId,
            role: "assistant", 
            content: response
        });
        return res.status(200).json(response);
    } catch (error) {
        // Log it on the backend terminal so you can easily track future issues!
        console.error("Backend agent handler crashed:", error);
        return res.status(500).json({ message: `agent error : ${error.message || error}` });
    }
}