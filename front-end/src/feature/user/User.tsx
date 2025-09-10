import useAuth from "../../hooks/useAuth";
import Tab from "../../components/Tab";
import Login from "../login/Login";
import SignUp from "../signUp/SignUp";
import { Post } from "../../util/Http";
import { END_POINT } from "../../consts/Const";
import { useEffect } from "react";
import useToast from "../../hooks/useToast";

export default function User() {
  const { isAuthenticated, userId, userEmail, setAuthenticated } = useAuth();
  const showToast = useToast();

  const TABS = [
    {
      id: "log-in",
      label: "Log In",
      component: <Login />,
    },
    {
      id: "sign-up",
      label: "Sign Up",
      component: <SignUp />,
    },
  ];

  useEffect(() => {
    window.scrollTo({ left: 0, top: 0 });
  });

  const logOut = async () => {
    const res = await Post(END_POINT.LOG_OUT, {});
    if (res.status === 200) {
      setAuthenticated(false);
      showToast("Success", "You're logged out", "success");
    } else {
      showToast("Error", "Something wrong", "error");
    }
  };

  return (
    <div className="size-full">
      {isAuthenticated && (
        <div className="h-160 w-full flex flex-col items-center">
          <div className="text-4xl flex flex-col items-center justify-center pt-10">
            <div className="border-b-4 border-double">User Information</div>
            <div className="flex flex-col justify-center">
              <div className="flex pt-20">
                <div className="text-end w-1/2">Username</div>
                <div className="pl-20 justify-baseline w-1/2">{userId}</div>
              </div>
              <div className="flex pt-20">
                <div className="w-1/2 text-end">Email</div>
                <div className="w-1/2 pl-20 justify-baseline">{userEmail}</div>
              </div>
            </div>
            <div className="pt-20 text-lg flex justify-center">
              <button
                className="text-lg bg-blue-500 transition delay-150 duration-500 ease-in-out hover:bg-indigo-500 text-white"
                onClick={logOut}
              >
                Log Out
              </button>
            </div>
          </div>
        </div>
      )}
      {!isAuthenticated && (
        <div className="pt-10">
          <Tab tabs={TABS} />
        </div>
      )}
    </div>
  );
}
