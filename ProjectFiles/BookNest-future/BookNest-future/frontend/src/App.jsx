
import {BrowserRouter,Routes,Route} from "react-router-dom";
import Home from "./User/Home";
import Wishlist from "./User/Wishlist";
import Cart from "./User/Cart";
import Orders from "./User/Orders";
import Navbar from "./Components/Navbar";
import AdminDashboard from "./Admin/Dashboard";
import SellerDashboard from "./Seller/Dashboard";

import Login from "./pages/Login";
import Register from "./pages/Register";

export default function App(){
 return(
  <BrowserRouter>
   <Navbar/>
   <Routes>
    <Route path="/" element={<Home/>}/>
    <Route path="/wishlist" element={<Wishlist/>}/>
    <Route path="/cart" element={<Cart/>}/>
    <Route path="/orders" element={<Orders/>}/>
    <Route path="/admin" element={<AdminDashboard/>}/>
    <Route path="/seller" element={<SellerDashboard/>}/>
    <Route path="/login" element={<Login />} />
    <Route path="/register" element={<Register />} />
   </Routes>
  </BrowserRouter>
 );
}
