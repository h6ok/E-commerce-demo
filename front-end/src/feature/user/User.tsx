import useAuth from "../../hooks/useAuth";
import Login from "../login/Login";

export default function User() {
  const { isAuthenticated } = useAuth();

  return (
    <>
      {isAuthenticated && <div>You are Authenticated</div>}
      {!isAuthenticated && <Login />}
    </>
  );
}
