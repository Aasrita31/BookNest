import express from "express";
import Order from "../models/Order.js";
import Cart from "../models/Cart.js";

const router = express.Router();


router.post("/checkout/:userId", async (req, res) => {
  const cartItems = await Cart.find({ userId: req.params.userId }).populate("bookId");

  if (cartItems.length === 0) {
    return res.status(400).json({ message: "Cart is empty" });
  }

  const items = cartItems.map(item => ({
    bookId: item.bookId._id,
    quantity: item.quantity,
    price: item.bookId.price
  }));

  const totalAmount = items.reduce(
    (sum, i) => sum + i.price * i.quantity,
    0
  );

  const order = await Order.create({
    userId: req.params.userId,
    items,
    totalAmount
  });

  await Cart.deleteMany({ userId: req.params.userId });

  res.json(order);
});

router.get("/user/:userId", async (req, res) => {
  const orders = await Order.find({ userId: req.params.userId })
    .populate("items.bookId");
  res.json(orders);
});

router.get("/", async (req, res) => {
  const orders = await Order.find()
    .populate("userId")
    .populate("items.bookId");
  res.json(orders);
});

router.put("/:id/status", async (req, res) => {
  const { status } = req.body;
  const order = await Order.findByIdAndUpdate(
    req.params.id,
    { status },
    { new: true }
  ).populate("userId").populate("items.bookId");

  res.json(order);
});

export default router;