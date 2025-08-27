import { useState, useEffect, useContext } from "react";
import { UserContext } from "../context/UserContext";
import { useNavigate, Link } from "react-router-dom";

export const AccountPage = () => {
  const { user, fetchMe, logout, isAdmin, loading: contextLoading } = useContext(UserContext);
  const navigate = useNavigate();

  const [editMode, setEditMode] = useState(false);
  const [formData, setFormData] = useState({ username: "", email: "" });
  const [loading, setLoading] = useState(true);

  // Fetch user on mount
  useEffect(() => {
    const loadUser = async () => {
      const token = localStorage.getItem("token");
      if (!token) {
        navigate("/login", { replace: true });
        return;
      }
      setLoading(true);
      await fetchMe(); // fetchMe updates context.user with res.data.user
      setLoading(false);
    };
    loadUser();
  }, [fetchMe, navigate]);

  // Sync form data with context user
  useEffect(() => {
    if (user) {
      setFormData({
        username: user.username || "",
        email: user.email || "",
      });
    }
  }, [user]);

  const handleChange = (e) => setFormData(prev => ({ ...prev, [e.target.name]: e.target.value }));

  const handleUpdate = async (e) => {
    e.preventDefault();
    try {
      const token = localStorage.getItem("token");
      const res = await fetch("http://localhost:3000/api/v1/users/me", {
        method: "PATCH",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify(formData),
      });
      const data = await res.json();
      if (!res.ok) throw new Error(data.message || "Update failed");

      alert("Profile updated successfully!");
      setEditMode(false);
      await fetchMe(); // refresh context
    } catch (err) {
      alert(err.message);
    }
  };

  const handleDelete = async () => {
    if (!window.confirm("Are you sure you want to delete your account?")) return;

    try {
      const token = localStorage.getItem("token");
      const res = await fetch("http://localhost:3000/api/v1/users/me", {
        method: "DELETE",
        headers: { Authorization: `Bearer ${token}` },
      });
      const data = await res.json();
      if (!res.ok) throw new Error(data.message || "Delete failed");

      logout();
      navigate("/login", { replace: true });
    } catch (err) {
      alert(err.message);
    }
  };

  const handleLogout = () => {
    logout();
    navigate("/login", { replace: true });
  };

  if (loading || contextLoading) {
    return (
      <div className="min-h-screen flex justify-center items-center bg-background text-foreground font-semibold">
        Loading user data...
      </div>
    );
  }

  if (!user) return null;

  return (
    <div className="min-h-screen bg-background text-foreground px-8 py-6">
      {/* Breadcrumb */}
      <div className="mb-6 text-sm text-gray-500 flex gap-2">
        <Link to="/" className="hover:text-primary transition-colors">Home</Link>
        <span>/</span>
        <span>Account</span>
      </div>

      <div className="max-w-5xl mx-auto grid md:grid-cols-2 gap-10">
        {/* Left Panel */}
        <div className="flex flex-col border-london-blue border-2 p-6 gap-6">
          <div>
            <span className="text-xs text-gray-400 uppercase">Username</span>
            <div className="text-lg font-semibold">{user.username}</div>
          </div>
          <div>
            <span className="text-xs text-gray-400 uppercase">Email</span>
            <div className="text-lg font-semibold">{user.email}</div>
          </div>
          <div>
            <span className="text-xs text-gray-400 uppercase">Role</span>
            <div className="text-lg font-semibold capitalize">{user.role}</div>
          </div>

          <div className="flex flex-col gap-2 mt-6">
            <button
              onClick={() => setEditMode(true)}
              className="w-full py-2 bg-primary text-white font-semibold hover:bg-primary/90 transition-all"
            >
              Edit Profile
            </button>

            {isAdmin() && (
              <Link
                to="/admin"
                className="w-full py-2 bg-yellow-500 text-white font-semibold hover:bg-yellow-600 transition-all text-center"
              >
                Go to Admin Panel
              </Link>
            )}

            <button
              onClick={handleLogout}
              className="w-full py-2 border border-primary text-primary font-semibold hover:bg-primary hover:text-white transition-all"
            >
              Logout
            </button>

            <button
              onClick={handleDelete}
              className="w-full py-2 bg-red-600 text-white font-semibold hover:bg-red-700 transition-all"
            >
              Delete Account
            </button>
          </div>
        </div>

        {/* Right Panel - Edit Form */}
        {editMode && (
          <div className="flex flex-col border-london-blue border-2 p-6 gap-6">
            <h2 className="text-lg font-bold mb-4">Edit Account</h2>
            <form className="flex flex-col gap-4" onSubmit={handleUpdate}>
              <div className="flex flex-col">
                <label className="text-sm text-gray-400 uppercase mb-1">Username</label>
                <input
                  type="text"
                  name="username"
                  value={formData.username}
                  onChange={handleChange}
                  className="w-full p-2 border border-gray-300 focus:border-primary outline-none bg-transparent text-foreground"
                />
              </div>
              <div className="flex flex-col">
                <label className="text-sm text-gray-400 uppercase mb-1">Email</label>
                <input
                  type="email"
                  name="email"
                  value={formData.email}
                  onChange={handleChange}
                  className="w-full p-2 border border-gray-300 focus:border-primary outline-none bg-transparent text-foreground"
                />
              </div>

              <button
                type="submit"
                className="mt-4 py-2 bg-primary text-white font-semibold hover:bg-primary/90 transition-all"
              >
                Save Changes
              </button>
            </form>
          </div>
        )}
      </div>
    </div>
  );
};
