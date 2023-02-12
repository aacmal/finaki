import { Request, Response } from "express";
import * as UserService from "../services/user.service";

export async function getUser(req: Request, res: Response) {
  try {
    const userId = req.user;
    const user = await UserService.getById(userId as string);
    if (!user) return res.status(404).json({ message: "User not found" });
    res.statusMessage = "User found";
    res.json({
      message: "User has been fetched successfully",
      data: {
        id: user._id,
        name: user.name,
        email: user.email,
      },
    });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
}
