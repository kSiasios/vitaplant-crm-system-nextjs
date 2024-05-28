"use client";

// pages/auth/signin.tsx
// import { getProviders } from "next-auth/react";
import { getCsrfToken, signIn } from "next-auth/react";
import { useRouter } from "next/navigation";
import { FormEvent, useEffect, useState } from "react";

const SignIn = () => {
  const [csrf, setCSRF] = useState<string>();
  const [creds, setCreds] = useState({
    username: "",
    password: "",
  });
  const [pending, setPending] = useState(false);
  const router = useRouter();

  //   console.log(providers);

  const handleInputChange = (e: any) => {
    setCreds((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    console.log("Submit!");
    console.log(creds);

    setPending(true);

    if (!creds.username || !creds.password) {
      console.error("All fields must be filled!");
    }

    try {
      const res = await signIn("credentials", {
        username: creds.username,
        password: creds.password,
        redirect: false,
      });
      if (res?.error) {
        console.error(res.error);
        setPending(false);
        return;
      }
      router.replace("/");
    } catch (error) {
      console.error(error);
    }
  };

  useEffect(() => {
    const getData = async () => {
      const res = await getCsrfToken();
      // return res;
      console.log(res);
      setCSRF(res);
    };
    // setCSRF(await getCsrfToken())
    getData();
  }, []);

  return (
    <div className="flex flex-col min-h-[50vh] justify-center items-center">
      <h1 className="font-bold text-3xl text-white">Sign In</h1>
      <form
        method="post"
        action="/api/auth/callback/credentials"
        className="flex flex-col gap-1"
        onSubmit={handleSubmit}
      >
        <input name="csrfToken" type="hidden" defaultValue={csrf} />
        <label className="flex flex-col">
          Username
          <input
            name="username"
            type="text"
            value={creds.username}
            onChange={handleInputChange}
          />
        </label>
        <label className="flex flex-col">
          Password
          <input
            name="password"
            type="password"
            value={creds.password}
            onChange={handleInputChange}
          />
        </label>
        <button
          type="submit"
          className="py-2 rounded-lg font-bold"
          disabled={pending}
        >
          {pending ? "Singing in..." : "Sign in"}
        </button>
      </form>
    </div>
  );
};

// async function getData() {
//   const csrfToken = await getCsrfToken();
//   return {
//     props: { csrfToken },
//   };
// }

export default SignIn;