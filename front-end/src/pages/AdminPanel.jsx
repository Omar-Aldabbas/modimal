import { useContext } from "react";
import { useNavigate } from "react-router-dom"; // assuming react-router
import { UserContext } from "../context/UserContext";

export const AdminPanel = () => {
  const { isAdmin, logout } = useContext(UserContext);
  const navigate = useNavigate();

  if (!isAdmin()) {
    return (
      <div className="min-h-screen flex justify-center items-center text-red-600">
        Access Denied
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background text-foreground p-6 flex flex-col">
      {/* Breadcrumb */}
      <div className="text-sm  mb-4 text-foreground text-md tracking-widest">
        <button onClick={() => navigate("/")} className="hover:underline hover:text-primary">
          Home
        </button>{" "}
        / {" "}<span>Admin Panel</span>
      </div>

      <h1 className="text-3xl font-bold mb-6">Admin Panel</h1>

      <button
        onClick={logout}
        className="mt-6 py-2 px-6 bg-red-600 text-background font-bold rounded-sm hover:bg-red-700 transition self-start"
      >
        Logout
      </button>
    </div>
  );
};
