import { useEffect, useState } from "react";
import API from "../api/api";
import { toast } from "react-toastify";

export default function Wishlist() {
  const user = JSON.parse(localStorage.getItem("user"));
  const [items, setItems] = useState([]);
  const [loading, setLoading] = useState(true);

  const loadWishlist = async () => {
    try {
      const res = await API.get(`/wishlist/${user._id}`);
      setItems(res.data);
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (user) loadWishlist();
  }, []);

  const removeFromWishlist = async (id) => {
    await API.delete(`/wishlist/${id}`);
    setItems(items.filter(item => item._id !== id));
  };

  if (!user) {
    return (
      <div className="p-6 text-center text-xl">
        Please login to view your wishlist
      </div>
    );
  }

  if (loading) {
    return (
      <div className="p-6 text-center text-lg">
        Loading wishlist...
      </div>
    );
  }

  return (
    <div className="p-6 max-w-5xl mx-auto">
      <h2 className="text-2xl font-bold mb-6 text-center">
        ❤️ My Wishlist
      </h2>

      {items.length === 0 && (
        <p className="text-center text-gray-500">
          Your wishlist is empty
        </p>
      )}

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {items.map(item => (
          <div
            key={item._id}
            className="bg-white rounded-lg shadow-md p-4 flex flex-col justify-between"
          >
            <div>
              <h3 className="text-lg font-semibold">
                {item.bookId.title}
              </h3>
              <p className="text-sm text-gray-600">
                {item.bookId.author}
              </p>
              <p className="mt-2 font-bold text-blue-600">
                ₹{item.bookId.price}
              </p>
            </div>

            <button
              onClick={() => removeFromWishlist(item._id)}
              className="mt-4 bg-red-500 text-white py-1 rounded hover:bg-red-600 transition"
            >
              Remove
            </button>
          </div>
        ))}
      </div>
    </div>
  );
}