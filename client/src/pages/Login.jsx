import { useState } from "react";
import { useAuthContext } from "../contexts/AuthContext";
import { IoEyeOutline, IoEyeOffOutline } from "react-icons/io5";

const Login = () => {
  const { login, signup } = useAuthContext();

  const [mode, setMode] = useState("login");
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [show, setShow] = useState(false);

  const handleLogin = async (e) => {
    e.preventDefault();
    await login(email, password);
  };

  const handleSignup = async (e) => {
    e.preventDefault();
    await signup(name, email, password);
  };

  return (
    <main className="min-h-screen flex items-center justify-center bg-slate-50 px-4">
      <div className="w-full max-w-md bg-white border border-slate-200 rounded-2xl p-8">
        <h1 className="text-3xl font-bold text-slate-900 text-center mb-8">
          {mode === "login" ? "Login" : "Sign up"}
        </h1>

        {/* Login Form */}
        {mode === "login" && (
          <div>
            <form className="space-y-5">
              <div className="flex flex-col gap-2">
                <label className="text-sm font-medium text-slate-700">
                  Email
                </label>
                <input
                  className="w-full px-4 py-3 border border-slate-300 rounded-lg
                         focus:outline-none focus:ring-2 focus:ring-blue-500
                         focus:border-blue-500 transition"
                  type="email"
                  placeholder="Enter your Email"
                  required
                  value={email}
                  onChange={(e) => {
                    setEmail(e.target.value);
                  }}
                />
              </div>

              <div className="flex flex-col gap-2">
                <label
                  htmlFor="password"
                  className="text-sm font-medium text-slate-700"
                >
                  Password
                </label>

                <div className="relative">
                  <input
                    className="w-full px-4 py-3 border border-slate-300 rounded-lg
                           focus:outline-none focus:ring-2 focus:ring-blue-500
                           focus:border-blue-500 transition"
                    id="password"
                    type={show ? "text" : "password"}
                    placeholder="Enter your Password"
                    required
                    value={password}
                    onChange={(e) => {
                      setPassword(e.target.value);
                    }}
                  />

                  <button
                    className="absolute right-3 top-1/2 -translate-y-1/2
                           text-slate-500 hover:text-blue-600 transition"
                    type="button"
                    onClick={() => {
                      setShow(!show);
                    }}
                    aria-label={show ? "Hide password" : "Show password"}
                  >
                    {show ? <IoEyeOffOutline /> : <IoEyeOutline />}
                  </button>
                </div>
              </div>

              <div className="text-right">
                <button
                  className="text-sm text-blue-600 hover:text-blue-700 font-medium"
                  type="button"
                >
                  Forgot password?
                </button>
              </div>

              <button
                className="w-full bg-blue-600 text-white py-3 rounded-lg
                       font-medium hover:bg-blue-700 transition-colors"
                type="submit"
                onClick={handleLogin}
              >
                Login
              </button>

              <p className="text-center text-sm text-slate-600">
                Don't have an account?{" "}
                <button
                  className="text-blue-600 hover:text-blue-700 font-medium"
                  type="button"
                  onClick={(e) => {
                    e.preventDefault();
                    setMode("signup");
                  }}
                >
                  Sign up
                </button>
              </p>
            </form>
          </div>
        )}

        {/* Signup Form */}
        {mode === "signup" && (
          <div>
            <form className="space-y-5">
              <div className="flex flex-col gap-2">
                <label className="text-sm font-medium text-slate-700">
                  Name
                </label>
                <input
                  className="w-full px-4 py-3 border border-slate-300 rounded-lg
                         focus:outline-none focus:ring-2 focus:ring-blue-500
                         focus:border-blue-500 transition"
                  type="text"
                  placeholder="Enter your Name"
                  required
                  value={name}
                  onChange={(e) => {
                    setName(e.target.value);
                  }}
                />
              </div>

              <div className="flex flex-col gap-2">
                <label className="text-sm font-medium text-slate-700">
                  Email
                </label>
                <input
                  className="w-full px-4 py-3 border border-slate-300 rounded-lg
                         focus:outline-none focus:ring-2 focus:ring-blue-500
                         focus:border-blue-500 transition"
                  type="email"
                  placeholder="Enter your Email"
                  required
                  value={email}
                  onChange={(e) => {
                    setEmail(e.target.value);
                  }}
                />
              </div>

              <div className="flex flex-col gap-2">
                <label
                  htmlFor="password"
                  className="text-sm font-medium text-slate-700"
                >
                  Password
                </label>

                <div className="relative">
                  <input
                    className="w-full px-4 py-3 border border-slate-300 rounded-lg
                           focus:outline-none focus:ring-2 focus:ring-blue-500
                           focus:border-blue-500 transition"
                    id="password"
                    type={show ? "text" : "password"}
                    placeholder="Enter your Password"
                    required
                    value={password}
                    onChange={(e) => {
                      setPassword(e.target.value);
                    }}
                  />

                  <button
                    className="absolute right-3 top-1/2 -translate-y-1/2
                           text-slate-500 hover:text-blue-600 transition"
                    type="button"
                    onClick={() => {
                      setShow(!show);
                    }}
                    aria-label={show ? "Hide password" : "Show password"}
                  >
                    {show ? <IoEyeOffOutline /> : <IoEyeOutline />}
                  </button>
                </div>
              </div>

              <div className="text-right">
                <button
                  className="text-sm text-blue-600 hover:text-blue-700 font-medium"
                  type="button"
                >
                  Forgot password?
                </button>
              </div>

              <button
                className="w-full bg-blue-600 text-white py-3 rounded-lg
                       font-medium hover:bg-blue-700 transition-colors"
                type="submit"
                onClick={handleSignup}
              >
                Signup
              </button>

              <p className="text-center text-sm text-slate-600">
                Already have an account?{" "}
                <button
                  className="text-blue-600 hover:text-blue-700 font-medium"
                  type="button"
                  onClick={(e) => {
                    e.preventDefault();
                    setMode("login");
                  }}
                >
                  Login
                </button>
              </p>
            </form>
          </div>
        )}
      </div>
    </main>
  );
};

export default Login;
