"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { FaCheck } from "react-icons/fa";
import { FaXmark } from "react-icons/fa6";
import { IoIosArrowRoundBack } from "react-icons/io";
import { IoTrashOutline } from "react-icons/io5";

const Items = () => {
  const [items, setItems] = useState<Array<any>>([]);

  const getData = async () => {
    const res = await fetch(`/api/items`);
    const items = await res.json();
    setItems(items);
    // console.log(items);
    return items;
  };

  useEffect(() => {
    getData();
  }, []);

  // const items: Array<any> = await getData();
  // console.log(items);
  // console.log(items.map((item) => item.subject));
  async function handleDelete(id: string) {
    // const reply = confirm("Are you sure you want to delete this item?");
    // console.log(reply);
    if (confirm("Are you sure you want to delete this item?")) {
      // console.log(`Deleted Item ${id}`);
      const data = {
        id,
      };

      const headers: Headers = new Headers();
      headers.set("Content-Type", "application/json");
      headers.set("Accept", "application/json");

      const response = await fetch("/api/items", {
        method: "DELETE",
        headers,
        body: JSON.stringify(data),
      });

      const text = await response.text();
      if (response.ok) {
        // console.log(text);
        getData();
      } else {
        console.error("There was an error upon deletion.");
        console.error(text);
      }
    }
  }

  const router = useRouter();

  return (
    <div className="flex flex-col w-fit mx-auto">
      <button
        onClick={() => router.back()}
        className="absolute aspect-square text-3xl border border-gray-400 p-4 rounded-full mx-4"
      >
        <IoIosArrowRoundBack />
      </button>
      <h1 className="font-bold text-4xl w-full text-center my-4 text-white">
        Items
      </h1>
      <div className="bg-white p-4 rounded-xl ">
        <table>
          <thead>
            <tr>
              <th scope="col">ID</th>
              <th scope="col">Subject</th>
              <th scope="col">Variety</th>
              <th scope="col">Price</th>
              <th scope="col">Amount</th>
              <th scope="col">Own Stock</th>
              <th scope="col">Distributor</th>
            </tr>
          </thead>
          <tbody>
            {items.map((item, idx) => (
              // <OrderItemEntry
              //   newItem={false}
              //   item={{
              //     subject: item.subject,
              //     variety: item.variety,
              //     price: item.price,
              //     amount: item.amount,
              //     stock: item.stock,
              //   }}
              //   key={idx}
              //   editable={false}
              //   availableSubjects={[item.subject]}
              //   availableVarieties={[item.variety]}
              // />
              <tr key={idx} className="group relative">
                <th
                  scope="row"
                  className="text-ellipsis max-w-32 overflow-hidden"
                >
                  {item._id}
                </th>
                <td className="text-center">{item.subject}</td>
                <td className="text-center">{item.variety}</td>
                <td className="text-center">{item.price}</td>
                <td className="text-center">{item.amount}</td>
                <td>
                  {item.stock.own ? (
                    <FaCheck className="mx-auto" />
                  ) : (
                    <FaXmark className="mx-auto" />
                  )}
                </td>
                <td className="text-center">
                  {item.stock.distributor ? item.stock.distributor : "-"}
                </td>
                <td className="absolute p-0 border-none h-full hidden group-hover:block">
                  <button
                    className="p-4 rounded-e bg-red-500 text-white h-full"
                    onClick={() => {
                      handleDelete(item._id);
                    }}
                  >
                    <IoTrashOutline />
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      <Link
        href="/items/new"
        className="bg-white w-fit mx-auto my-3 px-4 py-2 rounded-lg"
      >
        New
      </Link>
    </div>
  );
};

export default Items;
