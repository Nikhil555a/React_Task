// src/Layout/Navbar.jsx
import { useAuth } from "../context/AuthContext";

const Navbar = () => {
  const { user, logout } = useAuth();

  return (
    <nav className="bg-blue-600 text-white p-4 flex justify-between">
      <h1 className="text-xl font-bold">ToDo App</h1>
      {user && (
        <div className="flex gap-4 items-center">
          <span>{user.email}</span>
          <button
            onClick={logout}
            className="bg-red-500 px-3 py-1 rounded"
          >
            Logout
          </button>
        </div>
      )}
    </nav>
  );
};

export default Navbar;


