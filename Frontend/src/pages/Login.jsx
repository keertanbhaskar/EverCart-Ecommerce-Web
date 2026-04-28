import React, { useContext, useEffect, useState } from "react";
import { ShopContext } from "../context/ShopContext";
import axios from "axios";
import { toast } from "react-toastify";

const Login = () => {
  const [currentState, setCurrentState] = useState("Login");
  const { token, setToken, navigate, backendUrl } = useContext(ShopContext);
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const onSubmitHandler = async (e) => {
    e.preventDefault();
    try {
      const url = currentState === "Sign Up" ? "/api/user/register" : "/api/user/login";
      const body = currentState === "Sign Up" ? { name, email, password } : { email, password };
      const response = await axios.post(backendUrl + url, body);
      if (response.data.success) {
        setToken(response.data.token);
        localStorage.setItem("token", response.data.token);
      } else {
        toast.error(response.data.message);
      }
    } catch (error) {
      toast.error(error.message);
    }
  };

  useEffect(() => { if (token) navigate("/"); }, [token]);

  const inputCls = "w-full border border-gray-200 rounded-xl px-4 py-3 text-sm text-gray-900 placeholder-gray-400 outline-none focus:border-rose-400 focus:ring-2 focus:ring-rose-400/20 transition bg-stone-50";

  return (
    <div className="min-h-[70vh] flex items-center justify-center py-12">
      <div className="w-full max-w-sm">
        <div className="text-center mb-8">
          <h1 className="font-display text-3xl font-semibold text-gray-900">{currentState}</h1>
          <p className="text-gray-500 text-sm mt-2">
            {currentState === "Login" ? "Welcome back! Sign in to continue." : "Create your account to get started."}
          </p>
        </div>

        <form onSubmit={onSubmitHandler} className="bg-white border border-gray-100 rounded-2xl shadow-sm p-8 flex flex-col gap-4">
          {currentState === "Sign Up" && (
            <input onChange={(e) => setName(e.target.value)} value={name} className={inputCls} type="text" placeholder="Full name" required />
          )}
          <input onChange={(e) => setEmail(e.target.value)} value={email} className={inputCls} type="email" placeholder="Email address" required />
          <input onChange={(e) => setPassword(e.target.value)} value={password} className={inputCls} type="password" placeholder="Password" required />

          <div className="flex justify-between text-xs text-gray-500 -mt-1">
            <span className="cursor-pointer hover:text-gray-900 transition">Forgot password?</span>
            {currentState === "Login"
              ? <span onClick={() => setCurrentState("Sign Up")} className="cursor-pointer text-rose-500 hover:text-rose-600 font-medium transition">Create account</span>
              : <span onClick={() => setCurrentState("Login")} className="cursor-pointer text-rose-500 hover:text-rose-600 font-medium transition">Sign in instead</span>
            }
          </div>

          <button type="submit" className="w-full bg-gray-900 hover:bg-gray-700 text-white font-semibold py-3 rounded-xl text-sm transition mt-1">
            {currentState === "Login" ? "Sign In" : "Create Account"}
          </button>
        </form>
      </div>
    </div>
  );
};

export default Login;
