"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const authMiddleware_1 = require("../middlewares/authMiddleware");
const router = (0, express_1.Router)();
router.get("/protected", authMiddleware_1.protect, (req, res) => {
    res.json({
        message: "You accessed a protected route 🎉",
        userId: req.userId
    });
});
exports.default = router;
