import { Link, useNavigate } from "react-router-dom";

export default function Navbar() {
  const navigate = useNavigate();
  const user = JSON.parse(localStorage.getItem("user"));

  const logout = () => {
    localStorage.removeItem("user");
    navigate("/login");
  };

  return (
    <nav className="bg-blue-600 text-white px-6 py-4 flex justify-between items-center">
      <div className="space-x-4">
        <Link to="/" className="font-semibold hover:underline">Home</Link>

        {user && (
          <>
            <Link to="/wishlist" className="hover:underline">Wishlist</Link>
            <Link to="/cart" className="hover:underline">Cart</Link>
            <Link to="/orders" className="hover:underline">Orders</Link>
          </>
        )}

        {user?.role === "admin" && (
          <Link to="/admin" className="text-yellow-300 font-bold hover:underline">
            Admin Dashboard
          </Link>
        )}
        {user?.role === "seller" && (
          <Link to="/seller" className="text-yellow-300 font-bold hover:underline">
            Seller Dashboard
          </Link>
        )}
      </div>

      <div className="flex items-center space-x-3">
        {!user ? (
          <>
            <Link to="/login" className="hover:underline">Login</Link>
            <Link to="/register" className="hover:underline">Register</Link>
          </>
        ) : (
          <>
            <span className="font-medium">👤 {user.name}</span>
            <button
              onClick={logout}
              className="bg-red-500 px-3 py-1 rounded hover:bg-red-600"
            >
              Logout
            </button>
          </>
        )}
      </div>
    </nav>
  );
}