"use client";

import { useState } from "react";
import { FaPen } from "react-icons/fa";
import { GiTreeRoots } from "react-icons/gi";
import { IoIosArrowDown, IoIosArrowUp } from "react-icons/io";
import { LuPackage, LuPackageCheck, LuPackageOpen } from "react-icons/lu";
import { PiPlant } from "react-icons/pi";
import { TbCurrencyEuro, TbCurrencyEuroOff } from "react-icons/tb";

interface OrderProps {
  clientName: String;
  orderID: String;
  status: String;
  paymentStatus: String;
  items: Item[];
}
// interface PaymentInterface {
//   status: String;
//   amount: number;
// }

export interface Item {
  subject: string;
  variety: string;
  price: string;
  amount: string;
  stock: Stock;
}

export interface Stock {
  own: boolean;
  distributor: string;
}

const OrderItem = ({
  clientName,
  orderID,
  status,
  paymentStatus,
  items,
}: OrderProps) => {
  const [isExpanded, setIsExpanded] = useState(false);
  console.log(paymentStatus);

  return (
    <div>
      <div className="border-gray-400 border rounded-lg text-nowrap">
        <div
          className="cursor-pointer flex justify-between items-center p-2 w-full"
          onClick={() => {
            setIsExpanded(!isExpanded);
          }}
        >
          <div className="flex gap-2">
            <span>{clientName}</span>
            {/* <span className="opacity-45 text-ellipsis">ID: {orderID}</span> */}
          </div>
          <div className="flex gap-1">
            <div>
              {status === "registered" && (
                <LuPackageOpen className="text-red-500" />
              )}
              {status === "packed" && <LuPackage className="text-orange-400" />}
              {status === "complete" && (
                <LuPackageCheck className="text-green-700" />
              )}
            </div>
            <div>
              {paymentStatus === "complete" && (
                // <FaHourglassEnd className="text-green-700" />
                <TbCurrencyEuro className="text-green-700" />
              )}
              {paymentStatus === "in-advance" && (
                // <FaRegHourglassHalf className="text-orange-400" />
                <TbCurrencyEuro className="text-orange-400" />
              )}
              {paymentStatus === "due" && (
                // <FaHourglassStart className="text-red-500" />
                <TbCurrencyEuroOff className="text-red-500" />
              )}
            </div>
            {isExpanded ? <IoIosArrowUp /> : <IoIosArrowDown />}
          </div>
        </div>
        <div>
          {isExpanded && (
            <div className="p-2 flex flex-col">
              <div className="inline-flex gap-3 justify-between items-center">
                <div className="inline-flex items-center gap-1">
                  Status:{" "}
                  <span>
                    {status === "registered" && (
                      <LuPackageOpen className="text-red-500" />
                    )}
                    {status === "packed" && (
                      <LuPackage className="text-orange-400" />
                    )}
                    {status === "complete" && (
                      <LuPackageCheck className="text-green-700" />
                    )}
                  </span>
                </div>
                <div>
                  Payment <span className="capitalize">{paymentStatus}</span>
                </div>
                <button
                  type="button"
                  className="border border-black rounded-lg p-4 hover:bg-black hover:text-white focus:bg-black focus:text-white text-lg"
                >
                  {/* Sign Out */}
                  <FaPen />
                </button>
              </div>
              <div className="inline-flex gap-2">
                <label htmlFor={`status_${orderID}_1`}>
                  Active{" "}
                  <input
                    type="radio"
                    id={`status_${orderID}_1`}
                    name={`status_${orderID}`}
                    value="active"
                  />
                </label>
                <label htmlFor={`status_${orderID}_2`}>
                  Inactive
                  <input
                    type="radio"
                    id={`status_${orderID}_2`}
                    name={`status_${orderID}`}
                    value="inactive"
                  />
                </label>
                <label htmlFor={`status_${orderID}_3`}>
                  Pending
                  <input
                    type="radio"
                    id={`status_${orderID}_3`}
                    name={`status_${orderID}`}
                    value="pending"
                  />
                </label>
              </div>
              <div>
                Items:
                <div className="order-items-container">
                  {items.map((item, index) => (
                    <div
                      className="inline-flex gap-3 justify-center p-2 rounded-md"
                      key={index}
                    >
                      <div className="inline-flex items-center flex-row-reverse gap-1 flex-1 justify-start">
                        <GiTreeRoots className="text-orange-950" />{" "}
                        {item.subject}
                      </div>
                      <div className="inline-flex items-center gap-1 flex-1">
                        <PiPlant className="text-teal-800" /> {item.variety}
                      </div>
                    </div>
                  ))}
                </div>
                {/* <span>{items.toString()}</span> */}
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default OrderItem;
