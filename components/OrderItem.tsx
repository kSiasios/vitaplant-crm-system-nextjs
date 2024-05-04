"use client";

import { useState } from "react";
import { FaHourglassStart } from "react-icons/fa";
import { FaHourglassEnd, FaRegHourglassHalf } from "react-icons/fa6";
import { IoIosArrowDown, IoIosArrowUp } from "react-icons/io";

interface OrderProps {
  clientName: String;
  orderID: String;
  status: String;
  paymentStatus: PaymentInterface;
  items: Item[];
}
interface PaymentInterface {
  status: String;
  amount: number;
}

interface Item {
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
      <div
        onClick={() => {
          setIsExpanded(!isExpanded);
        }}
        className="cursor-pointer flex justify-between items-center p-2 border-gray-400 border rounded-lg"
      >
        <div className="flex gap-2">
          <span>{clientName}</span>
          <span className="opacity-45">ID: {orderID}</span>
        </div>
        <div className="flex gap-1">
          <div className="">
            {paymentStatus.status === "full" && (
              <FaHourglassEnd className="text-green-700" />
            )}
            {paymentStatus.status === "in advance" && (
              <FaRegHourglassHalf className="text-orange-400" />
            )}
            {paymentStatus.status === "due" && (
              <FaHourglassStart className="text-red-500" />
            )}
          </div>
          {isExpanded ? <IoIosArrowUp /> : <IoIosArrowDown />}
        </div>
      </div>
      {isExpanded && (
        <div className="border border-gray-400 border-t-0 p-2 rounded-lg">
          <div>
            Status: <span>{status}</span>
          </div>
          <div>
            Payment: <span>{paymentStatus.status}</span>
          </div>
          <div>
            Items:
            <div className="order-items-container">
              {items.map((item) => (
                <div>
                  <div>Subject: {item.subject}</div>
                  <div>Variety: {item.variety}</div>
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
