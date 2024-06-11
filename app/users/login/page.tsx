"use client";

// pages/auth/signin.tsx
// import { getProviders } from "next-auth/react";
import { signIn, useSession } from "next-auth/react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { FormEvent, useState } from "react";
import { IoIosArrowRoundBack } from "react-icons/io";

const SignIn = () => {
  // const [csrf, setCSRF] = useState<string>();
  const { data: session, status } = useSession();
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
    // console.log("Submit!");
    // console.log(creds);

    setPending(true);

    if (!creds.username || !creds.password) {
      console.error("All fields must be filled!");
    }

    try {
      const res = await signIn("credentials", {
        username: creds.username,
        password: creds.password,
        redirect: false,
        callbackUrl: process.env.URL,
      });
      if (res?.error) {
        console.error(res.error);
        setPending(false);
        return;
      }

      if (res && !res?.ok) {
        alert(await res.status);
      }
      // router.replace("/");
      // if (session) {
      //   console.log(session.user);
      // }

      // router.replace(`${process.env.URL ? process.env.URL : "/"}`);
    } catch (error) {
      console.error(error);
    }
  };

  if (status != "authenticated") {
    return (
      <div className="flex flex-col min-h-[50vh] justify-center items-center">
        <h1 className="font-bold text-3xl text-white">Σύνδεση</h1>
        <form
          method="post"
          action="/api/auth/callback/credentials"
          className="flex flex-col gap-4 bg-white p-8 rounded-xl"
          onSubmit={handleSubmit}
        >
          {/* <input name="csrfToken" type="hidden" defaultValue={csrf} /> */}
          <label className="flex flex-col">
            Όνομα Χρήστη
            <input
              name="username"
              type="text"
              value={creds.username}
              onChange={handleInputChange}
            />
          </label>
          <label className="flex flex-col">
            Κωδικός
            <input
              name="password"
              type="password"
              value={creds.password}
              onChange={handleInputChange}
            />
          </label>
          <button
            type="submit"
            className="bg-white text-black border border-black rounded-full px-6 py-3 hover:bg-black hover:text-white focus:bg-black focus:text-white"
            disabled={pending}
          >
            {pending ? "Γίνεται Σύνδεση..." : "Σύνδεση"}
          </button>
        </form>
      </div>
    );
  }

  router.push("/");

  return (
    <div className="flex flex-col gap-16 w-full h-screen items-center justify-center text-white">
      <h1 className="font-bold text-6xl">Είστε Συνδεδεμένος</h1>
      <Link
        className="flex items-center gap-2 bg-white text-black border border-black rounded-full px-6 py-3 hover:bg-black hover:text-white focus:bg-black focus:text-white"
        href="/"
      >
        <IoIosArrowRoundBack className="text-2xl" />
        Αρχική Σελίδα
      </Link>
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
