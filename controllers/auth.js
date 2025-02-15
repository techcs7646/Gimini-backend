const userModel = require("../models/userModel");
const { hashPassword, checkPassword } = require("../utils/bcrypt"); 
const { createToken } = require("../utils/jwt"); 

exports.signup = async (req, res) => {
    const { name, email, password } = req.body;
    if (!name || !email || !password) {
        return res.status(400).json({ message: "All fields are required" });
    }

    const user = await userModel.findOne({ email: email });
    if (user) {
        return res.status(400).json({ message: "User already exists" });
    }

    const hashedPassword = await hashPassword(password);
    const newUser = await userModel.collection.insertOne({ name, email, password: hashedPassword });
    const token = await createToken({ id: newUser.insertedId });
    return res.status(201).json({ message: "User created successfully", token });
};

exports.login = async (req, res) => {
    const { email, password } = req.body;
    if (!email || !password) {
        return res.status(400).json({ message: "All fields are required" });
    }

    const user = await userModel.findOne({ email: email });
    if (!user) {
        return res.status(400).json({ message: "User doesn't exist" });
    }

    const isPasswordSame = await checkPassword(password, user.password);
    if (!isPasswordSame) {
        return res.status(400).json({ message: "Invalid password" });
    }
    
    const token = await createToken({ id: user._id });
    return res.status(200).json({ message: "User logged in successfully", token });
};