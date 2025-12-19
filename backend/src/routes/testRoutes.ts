import { Router } from "express";
import { protect } from "../middlewares/authMiddleware";

const router = Router();

router.get("/protected", protect, (req, res) => {
  res.json({
    message: "You accessed a protected route 🎉",
    userId: (req as any).userId
  });
});

export default router;
