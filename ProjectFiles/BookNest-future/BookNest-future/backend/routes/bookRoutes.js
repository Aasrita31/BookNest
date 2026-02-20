import express from "express";
import Book from "../models/Book.js";

const router = express.Router();

/* GET ALL BOOKS */
router.get("/", async (req, res) => {
  const books = await Book.find();
  res.json(books);
});

/* ADD BOOK (SELLER) */
router.post("/", async (req, res) => {
  const book = await Book.create(req.body);
  res.json(book);
});

/* UPDATE BOOK */
// router.put("/:id", async (req, res) => {
//   const book = await Book.findByIdAndUpdate(
//     req.params.id,
//     req.body,
//     { new: true }
//   );
//   res.json(book);
// });
router.put("/:id", async (req, res) => {
  const { sellerId } = req.body;

  const book = await Book.findById(req.params.id);

  if (!book) return res.status(404).json({ message: "Not found" });

  if (book.sellerId.toString() !== sellerId) {
    return res.status(403).json({ message: "Unauthorized" });
  }

  const updated = await Book.findByIdAndUpdate(
    req.params.id,
    req.body,
    { new: true }
  );

  res.json(updated);
});

// /* DELETE BOOK */
// router.delete("/:id", async (req, res) => {
//   await Book.findByIdAndDelete(req.params.id);
//   res.json({ message: "Book removed" });
// });

router.delete("/:id", async (req, res) => {
  const { sellerId } = req.body;

  const book = await Book.findById(req.params.id);

  if (!book) {
    return res.status(404).json({ message: "Book not found" });
  }

  if (book.sellerId.toString() !== sellerId) {
    return res.status(403).json({ message: "Unauthorized" });
  }

  await Book.findByIdAndDelete(req.params.id);
  res.json({ message: "Book deleted" });
});

// GET BOOKS BY SELLER
router.get("/seller/:sellerId", async (req, res) => {
  const books = await Book.find({
    sellerId: req.params.sellerId
  });

  res.json(books);
});


export default router;