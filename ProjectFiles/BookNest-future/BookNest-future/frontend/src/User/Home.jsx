import { useEffect, useState } from "react";
import API from "../api/api";
import { toast } from "react-toastify";
import { Link } from "react-router-dom";

export default function Home() {
  const [books, setBooks] = useState([]);
  const user = JSON.parse(localStorage.getItem("user"));

  useEffect(() => {
    API.get("/books").then(res => setBooks(res.data));
  }, []);

  const addWishlist = async (bookId) => {

    if (!user) {
      toast.error("Please login first");
      return;
    }

    try {
      const res = await API.post("/wishlist", {
        userId: user._id,
        bookId
      });

      toast.success("Added to wishlist ❤️");
      console.log(res.data);
    } catch (err) {
        toast.warning(err.response?.data?.message || "Already in wishlist");
    }
  };

const addCart = async (bookId) => {
  if (!user) {
    return toast.info("Please login first");
  }

  try {
    await API.post("/cart", {
      userId: user._id,
      bookId,
      quantity: 1
    });
    toast.success("Added to cart 🛒");
  } catch (err) {
    toast.error("Failed to add to cart");
  }
};

  return (
    <div className="p-6 grid grid-cols-1 md:grid-cols-3 gap-6">
      {books.map(book => (
        <div key={book._id} className="bg-white rounded shadow p-4">
          <h3 className="font-bold text-lg">{book.title}</h3>
          <p className="text-sm text-gray-600">{book.author}</p>
          <p className="font-semibold mt-2">₹{book.price}</p>

          <div className="mt-4 flex justify-between">
            <button
              onClick={() => addWishlist(book._id)}
              className="bg-pink-500 text-white px-3 py-1 rounded hover:bg-pink-600"
            >
              Wishlist
            </button>
            <button
              onClick={() => addCart(book._id)}
              className="bg-green-500 text-white px-3 py-1 rounded hover:bg-green-600"
            >
              Cart
            </button>
          </div>
        </div>
      ))}
    </div>
  );
}