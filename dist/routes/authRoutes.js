"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const authController_js_1 = require("../controllers/authController.js");
const router = (0, express_1.Router)();
router.post('/register', authController_js_1.registerUser);
router.post('/login', authController_js_1.loginUser);
exports.default = router;
//রাউট ফাইলটি (authRoutes.ts) শুধু রিকোয়েস্ট রিসিভ করে তা কন্ট্রোলারের (authController.ts) কাছে পাঠিয়ে দেয়
