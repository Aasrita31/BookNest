import { useEffect, useState } from "react";
import API from "../api/api";
import { toast } from "react-toastify";

export default function SellerDashboard() {
  const user = JSON.parse(localStorage.getItem("user"));
  const [books, setBooks] = useState([]);
  const [form, setForm] = useState({
    title: "",
    author: "",
    price: ""
  });

  if (!user || user.role !== "seller") {
    return <h2 className="p-6 text-red-600">Access Denied</h2>;
  }

 useEffect(() => {
  API.get(`/books/seller/${user._id}`)
    .then(res => setBooks(res.data))
    .catch(() => toast.error("Failed to load books"));
}, []);

  const addBook = async () => {
    const res = await API.post("/books", {
      ...form,
      sellerId: user._id
    });
    toast.success("Book added");
    setBooks([...books, res.data]);
  };

  const deleteBook = async (id) => {
  try {
    await API.delete(`/books/${id}`, {
      data: { sellerId: user._id }
    });

    toast.success("Book removed");
    setBooks(books.filter(b => b._id !== id));
  } catch (err) {
    toast.error("Unauthorized or failed");
  }
};

  return (
    <div className="p-6">
      <h2 className="text-2xl font-bold mb-4">Seller Dashboard</h2>

      <div className="bg-white p-4 mb-4 space-y-2">
        <input placeholder="Title" onChange={e=>setForm({...form,title:e.target.value})}/>
        <input placeholder="Author" onChange={e=>setForm({...form,author:e.target.value})}/>
        <input placeholder="Price" onChange={e=>setForm({...form,price:Number(e.target.value)})}/>
        <button onClick={addBook}>Add Book</button>
      </div>

      {books.map(book => (
        <div key={book._id} className="bg-white p-4 mb-2 flex justify-between">
          <span>{book.title}</span>
          <button onClick={() => deleteBook(book._id)}>Delete</button>
        </div>
      ))}
    </div>
  );
}