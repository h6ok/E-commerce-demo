import useAuth from "../../hooks/useAuth";
import Tab from "../../components/Tab";
import Login from "../login/Login";
import SignUp from "../signUp/SignUp";

export default function User() {
  const { isAuthenticated } = useAuth();

  const TABS = [
    {
      id: "sign-in",
      label: "Sign In",
      component: <Login />,
    },
    {
      id: "sign-up",
      label: "Sign Up",
      component: <SignUp />,
    },
  ];

  return (
    <div className="size-full">
      {isAuthenticated && <div>You are Authenticated</div>}
      {!isAuthenticated && (
        <div className="pt-20">
          <Tab tabs={TABS} />
        </div>
      )}
    </div>
  );
}
