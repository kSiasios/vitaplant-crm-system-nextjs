"use client";
import OrderForm from "@/components/OrderForm";
import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";
import { IoIosArrowRoundBack } from "react-icons/io";

const NewOrder = () => {
  async function handleNewOrder(data: Object, e?: any) {
    e?.preventDefault();
    // console.log("new order!");
    // console.log(data);
    const headers: Headers = new Headers();
    headers.set("Content-Type", "application/json");
    headers.set("Accept", "application/json");

    try {
      const response = await fetch(`/api/orders/new`, {
        method: "POST",
        headers,
        body: JSON.stringify(data),
      });
      if (response.ok) {
        console.log("Created ");
      }

      if (!response.ok) {
        let jsonRes = await response.json();
        alert(jsonRes.error);
      }
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
            onClick={() => router.back()}
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
        onClick={() => router.back()}
        className="absolute aspect-square text-3xl border border-gray-400 p-4 rounded-full mx-4"
      >
        <IoIosArrowRoundBack />
      </button>
      <OrderForm handleSubmit={handleNewOrder} type="edit" />
    </div>
  );
};

export default NewOrder;
