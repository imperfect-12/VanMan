import { useAuthContext } from "../contexts/AuthContext";

const LogoutButton = () => {
  const { logout } = useAuthContext();
  return (
    <div className="flex justify-end">
      <button
        onClick={logout}
        className="px-4 py-2 rounded-lg border border-slate-300
               text-slate-700 font-medium
               hover:bg-slate-100
               focus:outline-none focus:ring-2
               focus:ring-blue-500 focus:ring-offset-2
               transition-colors"
      >
        Logout
      </button>
    </div>
  );
};

export default LogoutButton;
