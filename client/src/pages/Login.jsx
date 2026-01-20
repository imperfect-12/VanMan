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
    <main>
      <h1>{mode === "login" ? "Login" : "Sign up"}</h1>

      {/* Login Form */}
      {mode === "login" && (
        <div>
          <form>
            <div>
              <label>Email</label>
              <input
                type="email"
                placeholder="enter your Email"
                required
                value={email}
                onChange={(e) => {
                  setEmail(e.target.value);
                }}
              />
            </div>
            <div>
              <label htmlFor="password">Password</label>
              <input
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
                type="button"
                onClick={() => {
                  setShow(!show);
                }}
                aria-label={show ? "Hide password" : "Show password"}
              >
                {show ? <IoEyeOffOutline /> : <IoEyeOutline />}
              </button>
            </div>
            <div>
              <button type="button">forgot password?</button>
            </div>
            <button type="submit" onClick={handleLogin}>
              Login
            </button>
            <p>
              Don't have an account?{" "}
              <button
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
          <form>
            <div>
              <label>Name</label>
              <input
                type="text"
                placeholder="enter your Name"
                required
                value={name}
                onChange={(e) => {
                  setName(e.target.value);
                }}
              />
            </div>
            <div>
              <label>Email</label>
              <input
                type="email"
                placeholder="enter your Email"
                required
                value={email}
                onChange={(e) => {
                  setEmail(e.target.value);
                }}
              />
            </div>
            <div>
              <label htmlFor="password">Password</label>
              <input
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
                type="button"
                onClick={() => {
                  setShow(!show);
                }}
                aria-label={show ? "Hide password" : "Show password"}
              >
                {show ? <IoEyeOffOutline /> : <IoEyeOutline />}
              </button>
            </div>
            {/* <div>
              <label>Confirem Password</label>
              <input
                type="password"
                placeholder="Re-Enter your Password"
                required
              />
            </div> */}
            <div>
              <button type="button">forgot password?</button>
            </div>
            <button type="submit" onClick={handleSignup}>
              Signup
            </button>
            <p>
              Already have an account?{" "}
              <button
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
    </main>
  );
};

export default Login;
