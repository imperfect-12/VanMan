import { useEffect, useState } from "react";
import { useAuthContext } from "../contexts/useAuthContext";
import { IoEyeOutline, IoEyeOffOutline } from "react-icons/io5";
import { useNavigate } from "react-router-dom";

const Login = () => {
  const { login, signup, user } = useAuthContext();
  const navigate = useNavigate();

  const [mode, setMode] = useState("login");
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [show, setShow] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");
  const [submitting, setSubmitting] = useState(false);

  useEffect(() => {
    if (!user) return;
    navigate(user.role === "admin" ? "/admin" : "/dashboard", {
      replace: true,
    });
  }, [navigate, user]);

  const handleLogin = async (e) => {
    e.preventDefault();
    setErrorMessage("");
    try {
      setSubmitting(true);
      const loggedInUser = await login(email, password);
      navigate(loggedInUser.role === "admin" ? "/admin" : "/dashboard", {
        replace: true,
      });
    } catch (err) {
      setErrorMessage(err.message);
    } finally {
      setSubmitting(false);
    }
  };

  const handleSignup = async (e) => {
    e.preventDefault();
    setErrorMessage("");
    try {
      setSubmitting(true);
      const signedUpUser = await signup(name, email, password);
      navigate(signedUpUser.role === "admin" ? "/admin" : "/dashboard", {
        replace: true,
      });
    } catch (err) {
      setErrorMessage(err.message);
    } finally {
      setSubmitting(false);
    }
  };
  return (
    <main className="flex min-h-screen items-center justify-center px-4 py-10">
      <div className="surface-panel w-full max-w-md rounded-lg p-8">
        <div className="mb-8 text-center">
          <p className="text-sm font-semibold uppercase tracking-wide text-blue-600">
            VanMan
          </p>
        <h1 className="mt-2 text-3xl font-bold tracking-tight text-slate-950">
          {mode === "login" ? "Login" : "Sign up"}
        </h1>
        </div>

        {errorMessage && (
          <p className="mb-5 rounded-lg border border-red-200 bg-red-50 px-4 py-3 text-sm text-red-700">
            {errorMessage}
          </p>
        )}

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
                className="w-full rounded-lg bg-blue-600 py-3 font-semibold text-white shadow-sm shadow-blue-600/20
                       hover:bg-blue-700 hover:shadow-md hover:shadow-blue-600/25 disabled:cursor-not-allowed disabled:bg-slate-300"
                type="submit"
                onClick={handleLogin}
                disabled={submitting}
              >
                {submitting ? "Logging in..." : "Login"}
              </button>

              <p className="text-center text-sm text-slate-600">
                Don't have an account?{" "}
                <button
                className="text-blue-600 hover:text-blue-700 font-medium"
                type="button"
                onClick={(e) => {
                  e.preventDefault();
                  setErrorMessage("");
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
                className="w-full rounded-lg bg-blue-600 py-3 font-semibold text-white shadow-sm shadow-blue-600/20
                       hover:bg-blue-700 hover:shadow-md hover:shadow-blue-600/25 disabled:cursor-not-allowed disabled:bg-slate-300"
                type="submit"
                onClick={handleSignup}
                disabled={submitting}
              >
                {submitting ? "Creating account..." : "Signup"}
              </button>

              <p className="text-center text-sm text-slate-600">
                Already have an account?{" "}
                <button
                  className="text-blue-600 hover:text-blue-700 font-medium"
                type="button"
                onClick={(e) => {
                  e.preventDefault();
                  setErrorMessage("");
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
