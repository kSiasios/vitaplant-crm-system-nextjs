"use client";
import OrderForm from "@/components/OrderForm";
import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { IoIosArrowRoundBack } from "react-icons/io";

const NewOrder = () => {
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);
  const [error, setError] = useState(false);

  async function handleNewOrder(data: Object, e?: any) {
    e?.preventDefault();
    // console.log("new order!");
    // console.log(data);

    setLoading(true);

    const headers: Headers = new Headers();
    headers.set("Content-Type", "application/json");
    headers.set("Accept", "application/json");

    try {
      const response = await fetch(`/api/orders`, {
        method: "POST",
        headers,
        body: JSON.stringify(data),
      });
      if (response.ok) {
        console.log("Created ");
        setSuccess(true);

        setTimeout(() => {
          setSuccess(false);
        }, 5000);
      }

      if (!response.ok) {
        let jsonRes = await response.json();
        alert(jsonRes.error);
        setError(true);

        setTimeout(() => {
          setError(false);
        }, 5000);
      }

      setLoading(false);
    } catch (error) {
      alert(error);
    }
  }

  const router = useRouter();

  const { data: session } = useSession();

  if (!session?.user) {
    return (
      <div className="w-screen h-screen max-w-[500px] mx-auto flex flex-col gap-8 items-center justify-center">
        {/* <button
          onClick={() => router.back()}
          className="absolute aspect-square text-3xl border border-gray-400 p-4 rounded-full mx-4 left-1/3 top-1/3"
        >
          <IoIosArrowRoundBack />
        </button> */}
        <div className="flex flex-col justify-center items-center text-white">
          <h1 className="flex justify-center items-center w-full font-bold text-3xl">
            You are not allowed here!
          </h1>
          <button
            onClick={() => router.push("/")}
            className="flex justify-center items-center font-bold text-xl bg-transparent underline w-fit"
          >
            Go Back!
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="pt-8">
      <button
        onClick={() => router.push("/")}
        className="absolute aspect-square text-3xl border border-gray-400 p-4 rounded-full mx-4"
      >
        <IoIosArrowRoundBack />
      </button>
      <OrderForm
        handleSubmit={handleNewOrder}
        type="new"
        loading={loading}
        success={success}
        error={error}
      />
    </div>
  );
};

export default NewOrder;
