import { useState, type ChangeEvent } from "react";
import Input from "../../components/Input";
import { Post } from "../../util/Http";
import { END_POINT } from "../../consts/Const";
import useAuth from "../../hooks/useAuth";
import useToast from "../../hooks/useToast";

type UserData = {
  username: string;
  email: string;
  password: string;
};

const DEFAULT_USER = {
  username: "",
  email: "",
  password: "",
};

export default function SignUp() {
  const [data, setData] = useState<UserData>(DEFAULT_USER);

  const { setAuthenticated } = useAuth();
  const showToast = useToast();

  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    const updated = {
      ...data,
      [name]: value,
    };
    setData(updated);
  };

  const handleSignUp = async () => {
    try {
      const res = await Post(END_POINT.SIGN_UP, {
        usename: data?.username,
        email: data?.email,
        password: data?.password,
      });

      if (res.status !== 200) {
        throw new Error("failed");
      }

      setAuthenticated(data != null);
      showToast("Success", `Welcome ${data?.username}`, "success");
    } catch (_) {
      showToast("Error", "SignUp failed. please try again", "error");
    }
  };

  return (
    <div className="w-full flex flex-col">
      <div className="h-100 flex justify-center items-start">
        <div className="flex flex-col">
          <Input
            name="username"
            label="username"
            className="pt-10 text-2xl"
            type="text"
            value={data?.username}
            onChange={handleChange}
          />
          <Input
            name="email"
            label="email"
            className="pt-5 text-2xl"
            type="text"
            value={data?.email}
            onChange={handleChange}
          />
          <Input
            name="password"
            label="password"
            className="pt-5 text-2xl"
            type="password"
            value={data?.password}
            onChange={handleChange}
          />
          <div className="pt-10 flex justify-center">
            <button
              className="text-lg bg-blue-500 transition delay-150 duration-500 ease-in-out hover:bg-indigo-500 text-white"
              onClick={handleSignUp}
            >
              Sign Up
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

