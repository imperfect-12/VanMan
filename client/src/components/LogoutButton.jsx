import { useAuthContext } from "../contexts/AuthContext";

const LogoutButton = () => {
  const { logout } = useAuthContext();
  return (
    <div>
      <button onClick={logout}>Logout</button>
    </div>
  );
};

export default LogoutButton;
