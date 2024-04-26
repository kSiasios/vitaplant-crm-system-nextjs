"use client";

import { useState } from "react";
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
        className="bg-purple-500 cursor-pointer flex justify-between items-center"
      >
        <div className="flex gap-2">
          <span>{clientName}</span>
          <span className="opacity-45">ID: {orderID}</span>
        </div>
        {isExpanded ? <IoIosArrowUp /> : <IoIosArrowDown />}
      </div>
      {isExpanded && (
        <div>
          <div>
            Status: <span>{status}</span>
          </div>
          <div>
            Payment: <span>{paymentStatus.status}</span>
          </div>
          <div>
            Items: <span>{items.toString()}</span>
          </div>
        </div>
      )}
    </div>
  );
};

export default OrderItem;
