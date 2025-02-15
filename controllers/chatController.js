const jwt = require("jsonwebtoken");
const Chat = require("../models/Chat");

const authMiddleware = (req, res, next) => {
    const authHeader = req.header("Authorization");

    if (!authHeader || !authHeader.startsWith("Bearer ")) {
        return res.status(401).json({ message: "Unauthorized: No token provided" });
    }

    const token = authHeader.split(" ")[1]; 
    
    try {
        const decoded = jwt.verify(token, process.env.JWT_SECRET);
        req.userId = decoded.id; 
        next();
    } catch (error) {
        return res.status(401).json({ message: "Invalid Token", error: error.message });
    }
};

// Store Chat Message
const storeChat = async (req, res) => {
    const { userMessage, aiResponse } = req.body;

    try {
        let chat = await Chat.findOne({ userId: req.userId });
        if (!chat) {
            chat = new Chat({ userId: req.userId, chats: [] });
        }

        chat.chats.push({ userMessage, aiResponse });
        await chat.save();

        res.status(201).json({ message: "Chat saved successfully" });
    } catch (error) {
        res.status(500).json({ message: "Server error", error });
    }
};

// Get User Chat History
const getChatHistory = async (req, res) => {
    try {
        const chat = await Chat.findOne({ userId: req.userId });

       
        if (!chat) {
            return res.status(200).json({ message: "No chat history found", chats: [] });
        }

        res.status(200).json({ chats: chat.chats });
    } catch (error) {
        res.status(500).json({ message: "Server error", error: error.message });
    }
};


module.exports = { authMiddleware, storeChat, getChatHistory };