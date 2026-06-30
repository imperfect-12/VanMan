import { useAuthContext } from "../contexts/useAuthContext";

const LogoutButton = () => {
  const { logout } = useAuthContext();
  return (
    <div className="flex justify-end">
      <button
        onClick={logout}
        className="rounded-lg border border-slate-300 bg-white/80 px-4 py-2
               font-medium text-slate-700 shadow-sm
               hover:border-slate-400 hover:bg-slate-100
               focus:outline-none focus:ring-2
               focus:ring-blue-500 focus:ring-offset-2
               disabled:cursor-not-allowed disabled:opacity-60"
      >
        Logout
      </button>
    </div>
  );
};

export default LogoutButton;
