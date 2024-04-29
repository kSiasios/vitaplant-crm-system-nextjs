"use client";
import OrderForm from "@/components/OrderForm";
import { useRouter } from "next/navigation";
import { IoIosArrowRoundBack } from "react-icons/io";

const NewOrder = () => {
  function handleNewOrder(data: Object, e?: any) {
    e?.preventDefault();
    // console.log("new order!");
    console.log(data);
  }

  const router = useRouter();

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
