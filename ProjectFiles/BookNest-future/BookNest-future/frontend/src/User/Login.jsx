import { toast } from "react-toastify";

export default function Login(){

const submit = async () => {
  try {
    const res = await API.post("/auth/login", form);
    localStorage.setItem("user", JSON.stringify(res.data.user));
    toast.success("Login successful 👋");
    navigate("/");
  } catch (err) {
    toast.error("Invalid email or password");
  }
};
  return (
    <div>
      <h2>Login</h2>
      <input placeholder="email"/>
      <input placeholder="password"/>
      <button>Login</button>
    </div>
  );
}
