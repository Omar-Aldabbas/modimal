import { useState, useEffect, useContext } from "react";
import { useNavigate } from "react-router-dom";
import { UserContext } from "../context/UserContext";

export const AuthPage = () => {
  const { user, login, signup } = useContext(UserContext);
  const navigate = useNavigate();

  const [isLogin, setIsLogin] = useState(true);
  const [formData, setFormData] = useState({ username: "", email: "", password: "", passwordConfirm: "" });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  // Redirect if already logged in
  useEffect(() => {
    if (user) navigate("/account", { replace: true });
  }, [user, navigate]);

  const toggleForm = () => {
    setIsLogin(!isLogin);
    setFormData({ username: "", email: "", password: "", passwordConfirm: "" });
    setError("");
  };

  const handleChange = (e) => {
    setFormData((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError("");

    try {
      // Signup validation
      if (!isLogin && formData.password !== formData.passwordConfirm) {
        setError("Passwords do not match");
        setLoading(false);
        return;
      }

      const credentials = isLogin
        ? { email: formData.email, password: formData.password }
        : { username: formData.username, email: formData.email, password: formData.password };

      const result = isLogin ? await login(credentials) : await signup(credentials);

      if (!result.success) {
        setError(result.message);
      } else {
        navigate("/account", { replace: true }); // navigate immediately after success
      }
    } catch (err) {
      setError(err.message || "Something went wrong");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="bg-background min-h-screen flex items-center justify-center">
      <div className="w-full max-w-md p-10 shadow-xl border-l-4 border-primary flex flex-col gap-8">
        <h1 className="text-3xl font-extrabold text-center uppercase">{isLogin ? "Login" : "Sign Up"}</h1>

        {error && <p className="text-red-500 text-center">{error}</p>}

        <form className="flex flex-col gap-6" onSubmit={handleSubmit}>
          {!isLogin && (
            <input
              type="text"
              name="username"
              value={formData.username}
              onChange={handleChange}
              required
              placeholder="Username"
              className="w-full border-b-2 border-primary p-2 outline-none bg-transparent"
            />
          )}

          <input
            type="email"
            name="email"
            value={formData.email}
            onChange={handleChange}
            required
            placeholder="Email"
            className="w-full border-b-2 border-primary p-2 outline-none bg-transparent"
          />

          <input
            type="password"
            name="password"
            value={formData.password}
            onChange={handleChange}
            required
            placeholder="Password"
            className="w-full border-b-2 border-primary p-2 outline-none bg-transparent"
          />

          {!isLogin && (
            <input
              type="password"
              name="passwordConfirm"
              value={formData.passwordConfirm}
              onChange={handleChange}
              required
              placeholder="Confirm Password"
              className="w-full border-b-2 border-primary p-2 outline-none bg-transparent"
            />
          )}

          <button
            type="submit"
            disabled={loading}
            className={`py-3 font-bold uppercase ${
              loading ? "bg-primary/50 cursor-not-allowed" : "bg-primary text-white hover:bg-primary/90"
            }`}
          >
            {loading ? "Processing..." : isLogin ? "Login" : "Sign Up"}
          </button>
        </form>

        <p className="text-sm text-center text-gray-500">
          {isLogin ? "Don't have an account?" : "Already have an account?"}{" "}
          <button onClick={toggleForm} className="text-primary font-bold hover:underline">
            {isLogin ? "Sign Up" : "Login"}
          </button>
        </p>
      </div>
    </div>
  );
};
