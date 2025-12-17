import { useState } from "react";

const Login = () => {
  const [mode, setMode] = useState("login");

  return (
    <main>
      <h1>{mode === "login" ? "Login" : "Sign up"}</h1>
      {mode === "login" && (
        <div>
          <form>
            <div>
              <label>Email</label>
              <input type="email" placeholder="enter your Email" required />
            </div>
            <div>
              <label>Password</label>
              <input
                type="password"
                placeholder="Enter your Password"
                required
              />
            </div>
            <div>
              <button type="button">forgot password?</button>
            </div>
            <button type="submit">Login</button>
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
      {mode === "signup" && (
        <div>
          <form>
            <div>
              <label>Name</label>
              <input type="text" placeholder="enter your Name" required />
            </div>
            <div>
              <label>Email</label>
              <input type="email" placeholder="enter your Email" required />
            </div>
            <div>
              <label>Password</label>
              <input
                type="password"
                placeholder="Enter your Password"
                required
              />
            </div>
            <div>
              <label>Confirem Password</label>
              <input
                type="password"
                placeholder="Re-Enter your Password"
                required
              />
            </div>
            <div>
              <button type="button">forgot password?</button>
            </div>
            <button type="submit">Login</button>
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
