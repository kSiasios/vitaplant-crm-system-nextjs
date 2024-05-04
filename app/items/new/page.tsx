"use client";

import OrderItemEntry from "@/components/OrderItemEntry";
import { FormEvent, useState } from "react";

const NewItem = () => {
  const [orderItems, setOrderItems] = useState<Object>([]);
  const [loading, setLoading] = useState(false);

  const getOrderItems = (data: Array<Object>) => {
    setOrderItems(data);
  };

  const formSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    console.log(orderItems);
    setLoading(true);
    try {
      const res = await fetch("/api/items/new", {
        method: "POST",
        body: JSON.stringify(orderItems),
      });
      const resText = await res.json();
      console.log(resText);
    } catch (error) {
      console.error();
    } finally {
      setLoading(false);
    }
  };

  return (
    <div>
      <h1 className="font-bold text-4xl w-full text-center my-4">New Item</h1>
      <form
        className="max-w-[500px] mx-auto flex flex-col gap-4"
        onSubmit={formSubmit}
      >
        <OrderItemEntry handleChange={getOrderItems} newItem={true} />
        <button
          type="submit"
          disabled={loading}
          className="border border-green-700 bg-green-100 text-green-700 hover:bg-green-700 hover:text-white focus:bg-green-700 focus:text-white rounded-lg px-4 py-2"
        >
          {loading && "SAVING"}
          {!loading && "SAVE"}
        </button>
      </form>
    </div>
  );
};

export default NewItem;