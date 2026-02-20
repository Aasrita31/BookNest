import { useEffect, useState } from "react";
import API from "../api/api";
import { toast } from "react-toastify";

export default function Cart() {
  const user = JSON.parse(localStorage.getItem("user"));
  const [items, setItems] = useState([]);

  const loadCart = async () => {
    const res = await API.get(`/cart/${user._id}`);
    setItems(res.data);
  };

  useEffect(() => {
    if (user) loadCart();
  }, []);

  const checkoutCart = async () => {
  try {
    await API.post(`/orders/checkout/${user._id}`);
    toast.success("Order placed successfully 🎉");
    setItems([]); // clear cart UI
  } catch (err) {
    toast.error(err.response?.data?.message || "Checkout failed");
  }
};
  const updateQuantity = async (id, newQty) => {
    if (newQty < 1) return;

    try {
      const res = await API.put(`/cart/${id}`, {
        quantity: newQty
      });

      setItems(items.map(i => (i._id === id ? res.data : i)));
    } catch {
      toast.error("Failed to update quantity");
    }
  };

  const removeItem = async (id) => {
    await API.delete(`/cart/${id}`);
    setItems(items.filter(item => item._id !== id));
    toast.success("Item removed from cart");
  };

  const total = items.reduce(
    (sum, item) => sum + item.bookId.price * item.quantity,
    0
  );

  if (!user) {
    return <div className="p-6 text-center">Please login to view cart</div>;
  }

  return (
    <div className="p-6 max-w-4xl mx-auto">
      <h2 className="text-4xl font-bold mb-6">🛒 My Cart</h2>

      {items.length === 0 && (
        <p className="text-gray-500">Your cart is empty</p>
      )}

  {items.map(item => (
  <div
    key={item._id}
    className="bg-white rounded-lg shadow p-5 mb-4 
               flex justify-between items-center"
  >
    
    <div className="flex flex-col gap-3">
      <h3 className="text-2xl font-semibold">
        {item.bookId.title}
      </h3>
      <p className="font-bold text-xl">
        ₹{item.bookId.price}
      </p>

      <div className="flex items-center gap-3">
        <span className="text-sm text-gray-600">Quantity</span>

        <button
          onClick={() => updateQuantity(item._id, item.quantity - 1)}
          disabled={item.quantity === 1}
          className={`px-3 py-1 rounded text-lg font-bold
            ${item.quantity === 1
              ? "bg-gray-200 cursor-not-allowed"
              : "bg-gray-300 hover:bg-gray-400"}
          `}
        >
          −
        </button>

        <span className="px-4 py-1 border rounded font-semibold">
          {item.quantity}
        </span>

        <button
          onClick={() => updateQuantity(item._id, item.quantity + 1)}
          className="px-3 py-1 bg-gray-300 rounded text-lg font-bold hover:bg-gray-400"
        >
          +
        </button>
      </div>
    </div>

    <button
      onClick={() => removeItem(item._id)}
      className="bg-red-500 text-white px-4 py-2 rounded hover:bg-red-600 transition"
    >
      Remove
    </button>
  </div>
))}
        {items.length > 0 && ( 
            <div className=" mt-6 flex items-center justify-between">
                <span className="text-2xl font-bold">
                    Total: ₹{total}
                </span>
            <button
                className="mt-4 bg-green-500 text-white px-6 py-2 rounded hover:bg-green-600 transition"
                onClick={() => checkoutCart()}
            >
                Checkout
            </button>
            </div>
        )}
        
    </div>
  );
}