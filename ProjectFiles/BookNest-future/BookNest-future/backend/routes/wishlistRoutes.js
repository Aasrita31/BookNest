import express from "express";
import Wishlist from "../models/Wishlist.js";

const router = express.Router();

router.post("/", async (req, res) => {
  const { userId, bookId } = req.body;

  if (!userId || !bookId) {
    return res.status(400).json({ message: "userId and bookId required" });
  }

  const exists = await Wishlist.findOne({ userId, bookId });
  if (exists) {
    return res.status(400).json({ message: "Book already in wishlist" });
  }

  const item = await Wishlist.create({ userId, bookId });
  res.json(item);
});

router.get("/:userId", async (req, res) => {
  const items = await Wishlist.find({ userId: req.params.userId })
    .populate("bookId");

  res.json(items);
});

router.delete("/:id", async (req, res) => {
  await Wishlist.findByIdAndDelete(req.params.id);
  res.json({ message: "Removed from wishlist" });
});


export default router;