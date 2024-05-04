"use client";

import { useState } from "react";
import { FaHourglassStart } from "react-icons/fa";
import { FaHourglassEnd, FaRegHourglassHalf } from "react-icons/fa6";
import { GiTreeRoots } from "react-icons/gi";
import { IoIosArrowDown, IoIosArrowUp } from "react-icons/io";
import { LuPackage, LuPackageCheck, LuPackageOpen } from "react-icons/lu";
import { PiPlant } from "react-icons/pi";

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
  subject: String;
  variety: String;
  price: number;
  amount: number;
  ownStock: boolean;
}

const OrderItem = ({
  clientName,
  orderID,
  status,
  paymentStatus,
  items,
}: OrderProps) => {
  const [isExpanded, setIsExpanded] = useState(false);
  return (
    <div>
      <button
        onClick={() => {
          setIsExpanded(!isExpanded);
        }}
        className="cursor-pointer flex justify-between items-center p-2 border-gray-400 border rounded-lg w-full"
      >
        <div className="flex gap-2">
          <span>{clientName}</span>
          <span className="opacity-45">ID: {orderID}</span>
        </div>
        <div className="flex gap-1">
          <div className="">
            {paymentStatus === "full" && (
              <FaHourglassEnd className="text-green-700" />
            )}
            {paymentStatus === "in advance" && (
              <FaRegHourglassHalf className="text-orange-400" />
            )}
            {paymentStatus === "due" && (
              <FaHourglassStart className="text-red-500" />
            )}
          </div>
          {isExpanded ? <IoIosArrowUp /> : <IoIosArrowDown />}
        </div>
      </button>
      {isExpanded && (
        <div className="border border-gray-400 border-t-0 p-2 rounded-lg">
          <div className="inline-flex gap-3">
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
          </div>
          <div>
            Items:
            <div className="order-items-container">
              {items.map((item) => (
                <div className="inline-flex gap-3 justify-center p-2 rounded-md">
                  <div className="inline-flex items-center flex-row-reverse gap-1 flex-1 justify-start">
                    <GiTreeRoots className="text-orange-950" /> {item.subject}
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
  );
};

export default OrderItem;
