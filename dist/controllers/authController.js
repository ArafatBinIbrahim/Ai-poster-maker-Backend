"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.loginUser = exports.registerUser = void 0;
const bcryptjs_1 = __importDefault(require("bcryptjs"));
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const user_js_1 = require("../models/user.js");
// Generate JWT token helper
const generateToken = (userId) => {
    return jsonwebtoken_1.default.sign({ userId }, process.env.JWT_SECRET || 'secret', { expiresIn: '30d' });
};
// @route   POST /api/auth/register
// @desc    Register a new user
const registerUser = async (req, res) => {
    try {
        const { name, emailOrPhone, password } = req.body;
        const userExists = await user_js_1.User.findOne({ emailOrPhone });
        if (userExists) {
            res.status(400).json({ message: 'User already exists' });
            return;
        }
        const salt = await bcryptjs_1.default.genSalt(10);
        const passwordHash = await bcryptjs_1.default.hash(password, salt);
        const user = await user_js_1.User.create({
            name,
            emailOrPhone,
            passwordHash,
        });
        if (user) {
            res.status(201).json({
                _id: user._id,
                name: user.name,
                emailOrPhone: user.emailOrPhone,
                role: user.role,
                token: generateToken(user._id.toString()),
            });
        }
        else {
            res.status(400).json({ message: 'Invalid user data' });
        }
    }
    catch (error) {
        res.status(500).json({ message: 'Server error', error: error.message });
    }
};
exports.registerUser = registerUser;
// @route   POST /api/auth/login
// @desc    Authenticate user & get token
const loginUser = async (req, res) => {
    try {
        const { emailOrPhone, password } = req.body;
        const user = await user_js_1.User.findOne({ emailOrPhone });
        if (user && (await bcryptjs_1.default.compare(password, user.passwordHash))) {
            res.status(200).json({
                _id: user._id,
                name: user.name,
                emailOrPhone: user.emailOrPhone,
                role: user.role,
                token: generateToken(user._id.toString()),
            });
        }
        else {
            res.status(401).json({ message: 'Invalid email/phone or password' });
        }
    }
    catch (error) {
        res.status(500).json({ message: 'Server error', error: error.message });
    }
};
exports.loginUser = loginUser;
