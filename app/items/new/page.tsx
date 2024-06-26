"use client";

import OrderItemEntry from "@/components/OrderItemEntry";
import { useRouter } from "next/navigation";
import { FormEvent, useEffect, useState } from "react";
import { IoIosArrowRoundBack } from "react-icons/io";

const NewItem = () => {
  const [itemData, setItemData] = useState<any>([]);
  const [loading, setLoading] = useState(false);

  const getOrderItems = (data: Array<Object>) => {
    setItemData(data);
  };

  const fetchItems = async () => {
    const res = await fetch(`/api/items`);
    const items = await res.json();

    if (!res.ok) {
      const resText = await res.text();
      console.error(resText);
      alert(`Error while fetching items ${resText}`);
      return;
    }
  };

  const formSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    let data = {
      ...itemData[0],
      currentAmount: itemData[0].amount,
    };
    // setItemData(...itemData);
    setLoading(true);

    console.log(data);
    // return;

    try {
      const res = await fetch("/api/items", {
        method: "POST",
        body: JSON.stringify(data),
      });

      if (!res.ok) {
        const resText = await res.text();
        console.error(resText);
        alert(`Error while creating item ${resText}`);
        return;
      }

      const resJson = await res.json();
      console.log(resJson);
    } catch (error) {
      console.error();
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchItems();
  }, []);

  const router = useRouter();

  return (
    <div>
      <button
        onClick={() => router.back()}
        className="absolute aspect-square text-3xl border border-gray-400 p-4 rounded-full mx-4"
      >
        <IoIosArrowRoundBack />
      </button>
      <h1 className="font-bold text-4xl w-full text-center my-4 text-white">
        Νέο Αντικείμενο
      </h1>
      <form
        className="max-w-[500px] mx-auto flex flex-col gap-4"
        onSubmit={formSubmit}
      >
        <OrderItemEntry
          handleChange={getOrderItems}
          newItem={true}
          editable="edit"
        />
        <button
          type="submit"
          disabled={loading}
          className="border border-green-700 bg-green-100 text-green-700 hover:bg-green-700 hover:text-white focus:bg-green-700 focus:text-white rounded-lg px-4 py-2"
        >
          {loading && "Γίνεται Αποθήκευση..."}
          {!loading && "Αποθήκευση"}
        </button>
      </form>
    </div>
  );
};

export default NewItem;
