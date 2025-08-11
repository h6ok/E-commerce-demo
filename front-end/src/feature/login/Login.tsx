import { useState } from "react";
import Input from "../../components/Input";
import { END_POINT } from "../../consts/Const";

export default function Login() {
  const [id, setId] = useState("");
  const [password, setPassword] = useState("");

  function handleLogin() {
    const headers = {
      "Content-type": "application/json",
    };

    const body = JSON.stringify({
      username: id,
      password,
    });

    const requestOptions = {
      method: "POST",
      headers,
      body,
    };

    fetch(END_POINT.LOGIN, requestOptions)
      .then((res) => {
        console.log(res);
      })
      .catch((e) => {
        console.log(e);
      })
      .finally(() => {
        console.log("end");
      });
  }

  return (
    <>
      <div className="h-60 flex justify-center items-end-safe">
        <div className="text-3xl">Sign In</div>
      </div>
      <div className="h-100 flex justify-center items-start">
        <div className="flex flex-col">
          <Input
            className="pt-10 text-2xl"
            type="text"
            value={id}
            placeholder="email"
            onChange={(e) => setId(e.target.value)}
          />
          <Input
            className="pt-5 text-2xl"
            type="password"
            value={password}
            placeholder="password"
            onChange={(e) => setPassword(e.target.value)}
          />
          <div className="pt-10 flex justify-center">
            <button
              className="text-lg bg-blue-500 transition delay-150 duration-500 ease-in-out hover:bg-indigo-500 text-white"
              onClick={handleLogin}
            >
              confirm
            </button>
          </div>
        </div>
      </div>
    </>
  );
}
