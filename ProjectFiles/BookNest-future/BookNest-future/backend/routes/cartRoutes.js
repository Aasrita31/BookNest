import express from "express";
import Cart from "../models/Cart.js";

const router = express.Router();

router.post("/", async (req, res) => {
  const { userId, bookId, quantity } = req.body;

  if (!userId || !bookId) {
    return res.status(400).json({ message: "userId and bookId required" });
  }

  const existing = await Cart.findOne({ userId, bookId });

  if (existing) {
    existing.quantity += quantity || 1;
    await existing.save();
    return res.json(existing);
  }

  const item = await Cart.create({
    userId,
    bookId,
    quantity: quantity || 1
  });

  res.json(item);
});

router.get("/:userId", async (req, res) => {
  const items = await Cart.find({ userId: req.params.userId })
    .populate("bookId");   // 🔥 MAGIC LINE

  res.json(items);
});

// UPDATE CART QUANTITY
router.put("/:id", async (req, res) => {
  const { quantity } = req.body;

  if (quantity < 1) {
    return res.status(400).json({ message: "Quantity must be at least 1" });
  }

  const item = await Cart.findByIdAndUpdate(
    req.params.id,
    { quantity },
    { new: true }
  ).populate("bookId");

  res.json(item);
});

router.delete("/:id", async (req, res) => {
  await Cart.findByIdAndDelete(req.params.id);
  res.json({ message: "Removed from cart" });
});

export default router;