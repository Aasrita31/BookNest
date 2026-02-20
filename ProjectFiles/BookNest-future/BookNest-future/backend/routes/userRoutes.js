
import express from "express";
import User from "../models/User.js";
const router = express.Router();

router.post("/register", async(req,res)=>{
  const user = await User.create(req.body);
  res.json(user);
});

router.get("/", async(req,res)=>{
  res.json(await User.find());
});

router.put("/:id/role", async (req, res) => {
  const { role } = req.body;

  // Optional but recommended validation
  if (!["user", "seller", "admin"].includes(role)) {
    return res.status(400).json({ message: "Invalid role" });
  }

  const user = await User.findByIdAndUpdate(
    req.params.id,
    { role },
    { new: true }
  );

  res.json(user);
});

export default router;
