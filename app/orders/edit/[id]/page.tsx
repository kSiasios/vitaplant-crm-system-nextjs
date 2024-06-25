"use client";

import OrderForm from "@/components/OrderForm";
import { useRouter } from "next/navigation";
import { FormEvent, useEffect, useState } from "react";
import { IoIosArrowRoundBack } from "react-icons/io";

const EditOrder = ({ params }: { params: { id: string } }) => {
  const id = params.id;
  const [orderData, setOrderData] = useState({
    clientName: "",
    address: "",
    taxpayerNumber: "",
    phone: "",
    status: "",
    paymentAmount: "",
    paymentStatus: "",
    comments: "",
    items: [{}],
  });

  useEffect(() => {
    // fetch order data
    const fetchOrderData = async () => {
      const res = await fetch(`/api/orders/${id}`);
      const data = await res.json();

      // console.log(data);

      setOrderData(data);
    };

    fetchOrderData();
  }, []);

  const handleChange = (
    field: string,
    value: object | string | number | boolean
  ) => {
    setOrderData({
      ...orderData,
      [field]: value,
    });
  };

  const submitHandler = async (data: any, e: FormEvent) => {
    e.preventDefault();
    console.log("Handled Data");

    // send put request
    const req = await fetch(`/api/orders/${id}`, {
      method: "PUT",
      body: JSON.stringify({
        data,
      }),
    });

    const res = await req.json();

    // console.log(res);

    if (!req.ok) {
      alert(await res.text());
    }
  };

  const router = useRouter();

  return (
    <div>
      <button
        onClick={() => router.back()}
        className="absolute aspect-square text-3xl border border-gray-400 p-4 rounded-full mx-4"
      >
        <IoIosArrowRoundBack />
      </button>
      <OrderForm
        orderData={orderData}
        type="edit"
        handleSubmit={submitHandler}
        // handleChange=
      />
    </div>
  );
};

export default EditOrder;
