"use client";

import { normalizeGreekString } from "@/utils/helper";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { FaCheck } from "react-icons/fa";
import { FaXmark } from "react-icons/fa6";
import { IoIosArrowRoundBack } from "react-icons/io";
import { IoTrashOutline } from "react-icons/io5";

const Items = () => {
  const [items, setItems] = useState<Array<any>>([]);
  const [displayItems, setDisplayItems] = useState<Array<any>>([]);
  const [filter, setFilter] = useState({
    plant: "",
    subject: "",
    variety: "",
    price: 0.0,
    amount: 0,
    ownStock: false,
    distributor: "",
  });

  const getData = async () => {
    const res = await fetch(`/api/items`);

    if (!res.ok) {
      const resText = await res.text();
      console.error(resText);
      alert(`Error while fetching items: ${resText}`);
      return;
    }

    const items = await res.json();

    setItems(items);
    setDisplayItems(items);
    return items;
  };

  useEffect(() => {
    getData();
  }, []);

  useEffect(() => {
    filterEntries();
  }, [filter]);

  async function handleDelete(id: string) {
    if (confirm("Are you sure you want to delete this item?")) {
      const headers: Headers = new Headers();
      headers.set("Content-Type", "application/json");
      headers.set("Accept", "application/json");

      const response = await fetch(`/api/items/${id}`, {
        method: "DELETE",
        headers,
      });

      const text = await response.text();
      if (response.ok) {
        // console.log(text);
        getData();
      } else {
        console.error("There was an error upon deletion.");
        console.error(text);
        alert(text);
      }
    }
  }

  const filterEntries = () => {
    setDisplayItems(items);
    // console.log("Filter");
    // console.log(filter);

    if (
      filter.amount == 0 &&
      filter.distributor == "" &&
      !filter.ownStock &&
      filter.plant == "" &&
      filter.price == 0 &&
      filter.subject == "" &&
      filter.variety == ""
    ) {
      // console.log("No filter");

      return;
    }

    let prev = items;

    // console.log(prev);

    if (filter.plant != "") {
      prev = prev.filter((entry) =>
        normalizeGreekString(entry.plant).includes(
          normalizeGreekString(filter.plant)
        )
      );
    }
    if (filter.subject != "") {
      prev = prev.filter((entry) =>
        normalizeGreekString(entry.subject).includes(
          normalizeGreekString(filter.subject)
        )
      );
    }
    if (filter.variety != "") {
      prev = prev.filter((entry) =>
        normalizeGreekString(entry.variety).includes(
          normalizeGreekString(filter.variety)
        )
      );
    }
    if (filter.price) {
      prev = prev.filter((entry) => entry.price >= filter.price);
    }
    if (filter.amount) {
      prev = prev.filter((entry) => entry.amount >= filter.amount);
    }

    if (filter.ownStock) {
      prev = prev.filter((entry) => entry.stock.own === filter.ownStock);
    }

    if (filter.distributor != "") {
      prev = prev.filter((entry) =>
        normalizeGreekString(entry.stock.distributor).includes(
          normalizeGreekString(filter.distributor)
        )
      );
    }

    // console.log(prev);

    setDisplayItems(prev);
  };

  const router = useRouter();

  return (
    <div className="flex flex-col w-fit mx-auto">
      <button
        onClick={() => router.push("/")}
        className="absolute aspect-square text-3xl border border-gray-400 p-4 rounded-full mx-4"
      >
        <IoIosArrowRoundBack />
      </button>
      <h1 className="font-bold text-4xl w-full text-center my-4 text-white">
        Αποθήκη
      </h1>
      <div className="bg-white p-4 rounded-xl ">
        <table>
          <thead>
            <tr>
              {/* <th scope="col">ID</th> */}
              <th scope="col"></th>
              <th scope="col">Φυτό</th>
              <th scope="col">Υποκείμενο</th>
              <th scope="col">Ποικιλία</th>
              <th scope="col">Τιμή</th>
              <th scope="col">Ποσότητα</th>
              <th scope="col">Αποθήκη</th>
              <th scope="col">Ίδιο Απόθεμα</th>
              <th scope="col">Προμηθευτής</th>
            </tr>
          </thead>
          <tbody>
            <tr className="relative">
              <td className="text-center">Φίλτρα</td>
              <td className="text-center">
                <input
                  type="text"
                  name=""
                  id=""
                  value={filter.plant}
                  onChange={(e) => {
                    setFilter({ ...filter, plant: e.target.value });
                  }}
                />
              </td>
              <td className="text-center">
                <input
                  type="text"
                  name=""
                  id=""
                  value={filter.subject}
                  onChange={(e) => {
                    setFilter({ ...filter, subject: e.target.value });
                  }}
                />
              </td>
              <td className="text-center">
                <input
                  type="text"
                  name=""
                  id=""
                  value={filter.variety}
                  onChange={(e) => {
                    setFilter({ ...filter, variety: e.target.value });
                  }}
                />
              </td>
              <td className="text-center">
                {/* <input
                  type="text"
                  name=""
                  id=""
                  value={filter.price}
                  onChange={(e) => {
                    setFilter({ ...filter, price: e.target.value });
                  }}
                /> */}
              </td>
              <td className="text-center">
                {/* <input
                  type="text"
                  name=""
                  id=""
                  value={filter.amount}
                  onChange={(e) => {
                    setFilter({ ...filter, amount: e.target.value });
                  }}
                /> */}
              </td>
              <td className="text-center">
                {/* <input
                  type="text"
                  name=""
                  id=""
                  value={filter.amount}
                  onChange={(e) => {
                    setFilter({ ...filter, amount: e.target.value });
                  }}
                /> */}
              </td>
              <td>
                <input
                  type="checkbox"
                  name=""
                  id=""
                  value={`${filter.ownStock}`}
                  onChange={(e) => {
                    setFilter({ ...filter, ownStock: e.target.checked });
                  }}
                />
              </td>
              <td className="text-center">
                <input
                  type="text"
                  name=""
                  id=""
                  value={filter.distributor}
                  onChange={(e) => {
                    setFilter({ ...filter, distributor: e.target.value });
                  }}
                />
              </td>
            </tr>
            {displayItems.map((item, idx) => (
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
                {/* <th
                  scope="row"
                  className="text-ellipsis max-w-32 overflow-hidden"
                >
                  {item._id}
                </th> */}
                <td className="text-center"></td>
                <td className="text-center">{item.plant}</td>
                <td className="text-center">{item.subject}</td>
                <td className="text-center">{item.variety}</td>
                <td className="text-center">{item.price}</td>
                <td className="text-center">{item.amount}</td>
                <td className="text-center">{item.currentAmount}</td>
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
        Νέο Αντικείμενο
      </Link>
    </div>
  );
};

export default Items;
