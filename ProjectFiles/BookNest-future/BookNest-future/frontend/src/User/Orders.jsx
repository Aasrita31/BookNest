import { useEffect, useState } from "react";
import API from "../api/api";

export default function Orders() {
  const user = JSON.parse(localStorage.getItem("user"));
  const [orders, setOrders] = useState([]);

  useEffect(() => {
    if (user) {
      API.get(`/orders/user/${user._id}`)
        .then(res => setOrders(res.data))
        .catch(err => console.error(err));
    }
  }, []);

  if (!user) {
    return (
      <div className="p-6 text-center text-lg">
        Please login to view your orders
      </div>
    );
  }

  return (
    <div className="p-6 max-w-5xl mx-auto">
      <h2 className="text-3xl font-bold mb-6 text-center">
        📦 My Orders
      </h2>

      {orders.length === 0 && (
        <p className="text-center text-gray-500">
          You haven’t placed any orders yet
        </p>
      )}

      <div className="space-y-6">
        {orders.map(order => (
          <div
            key={order._id}
            className="bg-white rounded-lg shadow-md p-5"
          >
            
            <div className="flex justify-between items-center mb-3">
              <span className="text-sm text-gray-500">
                Order ID: {order._id}
              </span>

              <span
                className={`px-3 py-1 rounded-full text-sm font-medium
                  ${
                    order.status === "Delivered"
                      ? "bg-green-100 text-green-700"
                      : order.status === "Shipped"
                      ? "bg-blue-100 text-blue-700"
                      : order.status === "Cancelled"
                      ? "bg-red-100 text-red-700"
                      : "bg-yellow-100 text-yellow-700"
                  }
                `}
              >
                {order.status}
              </span>
            </div>

            <div className="border-t pt-3 space-y-2">
              {order.items.map(item => (
                <div
                  key={item._id}
                  className="flex justify-between text-gray-700"
                >
                  <span>
                    {item.bookId.title} × {item.quantity}
                  </span>
                  <span className="font-medium">
                    ₹{item.bookId.price * item.quantity}
                  </span>
                </div>
              ))}
            </div>

            {/* Order Total */}
            <div className="border-t mt-3 pt-3 flex justify-between font-bold">
              <span>Total</span>
              <span>₹{order.totalAmount}</span>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}