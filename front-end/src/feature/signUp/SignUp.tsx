import { useState, type ChangeEvent } from "react";
import Input from "../../components/Input";

type UserData = {
  username: string;
  email: string;
  password: string;
};

export default function SignUp() {
  const [data, setData] = useState<UserData | null>(null);

  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setData(null);
    console.log(name, value);
  };

  const handleSignUp = () => {
    alert("sign up");
  };

  return (
    <div className="w-full flex flex-col">
      <div className="h-100 flex justify-center items-start">
        <div className="flex flex-col">
          <Input
            label="username"
            className="pt-10 text-2xl"
            type="text"
            value={data?.username}
            placeholder="email"
            onChange={handleChange}
          />
          <Input
            label="email"
            className="pt-5 text-2xl"
            type="password"
            value={data?.password}
            placeholder="password"
            onChange={handleChange}
          />
          <Input
            label="password"
            className="pt-5 text-2xl"
            type="password"
            value={data?.password}
            placeholder="password"
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

