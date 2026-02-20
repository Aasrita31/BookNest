import { useEffect, useState } from "react";
import API from "../api/api";
import { toast } from "react-toastify";

export default function AdminDashboard() {
  const user = JSON.parse(localStorage.getItem("user"));
  const [users, setUsers] = useState([]);
  const [orders, setOrders] = useState([]);

  if (!user || user.role !== "admin") {
    return <h2 className="p-6 text-red-600">Access Denied</h2>;
  }

  useEffect(() => {
    API.get("/users").then(res => setUsers(res.data));
    API.get("/orders").then(res => setOrders(res.data));
  }, []);

  const updateRole = async (id, role) => {
  try {
    await API.put(`/users/${id}/role`, { role });

    setUsers(prev =>
      prev.map(u =>
        u._id === id ? { ...u, role } : u
      )
    );

    toast.success(`Role changed to ${role}`);
  } catch (err) {
    console.error(err);
    toast.error("Failed to update role");
  }
};

  const updateOrderStatus = async (id, status) => {
    await API.put(`/orders/${id}/status`, { status });
    toast.success("Order status updated");
    setOrders(prev =>
      prev.map(o => (o._id === id ? { ...o, status } : o))
    );
  };

  return (
    <div className="p-6 space-y-8">

      {/* SELLER MANAGEMENT */}
      <div>
        <h2 className="text-2xl font-bold mb-4">User Management</h2>
        {users.map(u => (
          <div key={u._id} className="bg-white p-4 mb-2 flex justify-between">
            <span>{u.name} ({u.email})</span>
            <select
              value={u.role}
              onChange={e => updateRole(u._id, e.target.value)}
            >
              <option value="user">User</option>
              <option value="seller">Seller</option>
              <option value="admin">Admin</option>
            </select>
          </div>
        ))}
      </div>

      {/* ORDER MANAGEMENT */}
      <div>
        <h2 className="text-2xl font-bold mb-4">Orders</h2>
        {orders.map(order => (
          <div key={order._id} className="bg-white p-4 mb-2">
            <p>User: {order.userId?.name}</p>
            <p>Total: ₹{order.totalAmount}</p>
            <select
              value={order.status}
              onChange={e =>
                updateOrderStatus(order._id, e.target.value)
              }
            >
              <option>Placed</option>
              <option>Shipped</option>
              <option>Delivered</option>
              <option>Cancelled</option>
            </select>
          </div>
        ))}
      </div>

    </div>
  );
}