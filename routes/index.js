const express = require("express");
const { signup, login } = require("../controllers/auth");
const { authMiddleware, storeChat, getChatHistory } = require("../controllers/chatController");

const router = express.Router();

router.post("/signup", signup);
router.post("/login", login); 
router.post("/store", authMiddleware, storeChat);
router.get("/history", authMiddleware, getChatHistory);

router.get("/", (req, res) => {
    return res.send("Hello from auth router");
});

module.exports = router;
