"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { FaPen } from "react-icons/fa";
import { GiTreeRoots } from "react-icons/gi";
import { IoIosArrowDown, IoIosArrowUp } from "react-icons/io";
import { IoTrash } from "react-icons/io5";
import { LuPackage, LuPackageCheck, LuPackageOpen } from "react-icons/lu";
import { PiFlowerTulip, PiPlant } from "react-icons/pi";
import { TbCurrencyEuro, TbCurrencyEuroOff } from "react-icons/tb";

interface OrderProps {
  orderData: any;
}
// interface PaymentInterface {
//   status: String;
//   amount: number;
// }

const OrderItem = ({ orderData }: OrderProps) => {
  const [isExpanded, setIsExpanded] = useState(false);

  const [isDeleted, setIsDeleted] = useState(false);
  // console.log(paymentStatus);

  const router = useRouter();

  const deleteOrder = async () => {
    if (
      confirm(
        `Είστε σίγουροι για τη διαγραφή της παραγγελίας; (${orderData._id})`
      )
    ) {
      if (orderData.status !== "complete") {
        if (
          !confirm(
            `Η παραγγελία δεν έχει ολοκληρωθεί (${orderData._id}).\nΔιαγράφοντάς την, το απόθεμα θα επιστρέψει στην αποθήκη.\nΕίστε σίγουροι ότι θέλετε να συνεχίσετε;`
          )
        ) {
          return;
        }
      }

      const res = await fetch(`/api/orders/${orderData._id}`, {
        method: "DELETE",
      });

      if (res.ok) {
        // router.refresh();
        // window.location.reload();
        setIsDeleted(true);
      } else {
        alert(await res.text());
      }
    }
    return;
  };

  const getCost = (data: any) => {
    let cost = 0;
    data.items.forEach((item: any) => {
      cost += item.amount * item.price;
    });

    return cost;
  };

  return (
    orderData && (
      <div className={isDeleted ? "hidden" : "block"}>
        <div className="border-gray-400 border rounded-lg text-nowrap">
          <div
            className="cursor-pointer flex justify-between items-center p-2 w-full"
            onClick={() => {
              setIsExpanded(!isExpanded);
            }}
          >
            <div className="flex flex-col gap-2">
              <span className="font-medium">{orderData.clientName}</span>
              <div className="inline-flex gap-2">
                <span className="italic">{`${new Date(
                  orderData.created.at
                ).toLocaleDateString("el-EL")}`}</span>
                <span className="font-semibold inline-flex items-center">
                  {getCost(orderData)} <TbCurrencyEuro />
                </span>
              </div>
            </div>
            <div className="flex gap-1 items-center">
              <div>
                <Link
                  className="flex gap-2 justify-center items-center border border-black rounded-lg p-4 hover:bg-black hover:text-white focus:bg-black focus:text-white text-lg"
                  href={`/orders/edit/${orderData._id}`}
                >
                  <FaPen />
                </Link>
              </div>
              <div>
                <button
                  className="border border-red-500 text-red-500 font-bold hover:bg-red-500 focus:bg-red-500 hover:text-white focus:text-white p-4 rounded-lg text-lg"
                  type="submit"
                  onClick={deleteOrder}
                >
                  {/* New Order */}
                  <IoTrash />
                </button>
              </div>
              <div>
                {orderData.status === "registered" && (
                  <LuPackageOpen className="text-red-500" />
                )}
                {orderData.status === "packed" && (
                  <LuPackage className="text-orange-400" />
                )}
                {orderData.status === "complete" && (
                  <LuPackageCheck className="text-green-700" />
                )}
              </div>
              <div>
                {orderData.paymentStatus === "complete" && (
                  <TbCurrencyEuro className="text-green-700" />
                )}
                {orderData.paymentStatus === "in-advance" && (
                  <TbCurrencyEuro className="text-orange-400" />
                )}
                {orderData.paymentStatus === "due" && (
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
                  <div className="flex flex-col">
                    <div className="inline-flex items-center gap-1">
                      Κατάσταση Παραγγελίας:{" "}
                      <span>
                        {orderData.status === "registered" && (
                          <LuPackageOpen className="text-red-500" />
                        )}
                        {orderData.status === "packed" && (
                          <LuPackage className="text-orange-400" />
                        )}
                        {orderData.status === "complete" && (
                          <LuPackageCheck className="text-green-700" />
                        )}
                      </span>
                    </div>
                    <div className="inline-flex items-center gap-1">
                      Κατάσταση Πληρωμής{" "}
                      <span>
                        {orderData.paymentStatus === "complete" && (
                          <TbCurrencyEuro className="text-green-700" />
                        )}
                        {orderData.paymentStatus === "in-advance" && (
                          <span className="flex items-center">
                            <TbCurrencyEuro className="text-orange-400" /> (
                            {orderData.paymentAmount})
                          </span>
                        )}
                        {orderData.paymentStatus === "due" && (
                          <TbCurrencyEuroOff className="text-red-500" />
                        )}
                      </span>
                    </div>
                  </div>
                </div>
                <div className="italic">{orderData.comments}</div>
                <div>
                  Αντικείμενα:
                  <div className="order-items-container">
                    {orderData.items.map((item: any, index: number) => (
                      <div
                        className="inline-flex gap-3 justify-between items-center p-2 rounded-md"
                        key={index}
                      >
                        {item.amount} x {parseFloat(item.price)}
                        <div className="inline-flex items-center gap-1 flex-1">
                          <PiFlowerTulip className="text-red-400" />{" "}
                          {item.plant}
                        </div>
                        <div className="inline-flex items-center gap-1 flex-1">
                          <GiTreeRoots className="text-orange-950" />{" "}
                          {item.subject}
                        </div>
                        <div className="inline-flex items-center gap-1 flex-1">
                          <PiPlant className="text-teal-800" /> {item.variety}
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    )
  );
};

export default OrderItem;
