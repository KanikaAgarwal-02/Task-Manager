import { Request, Response } from "express";
import * as userService from "../services/userService";

export const register = async (req: Request, res: Response) => {
  try {
    const { name, email, password } = req.body;
    const user = await userService.registerUser(name, email, password);
    console.log("REQ BODY:", req.body);

    res.status(201).json({
      message: "User registered successfully",
      user,
    });
  } catch (error: any) {
    res.status(400).json({ message: error.message });
  }
};

export const login = async (req: Request, res: Response) => {
  try {
    const { email, password } = req.body;
    const { user, token } = await userService.loginUser(email, password);

    res.cookie("token", token, {
      httpOnly: true,
      secure: true,
      sameSite: "none",
      maxAge: 7 * 24 * 60 * 60 * 1000,
    });

    res.status(200).json({
      message: "Login successful",
      user,
    });
  } catch (error: any) {
    res.status(401).json({ message: error.message });
  }
};
