"use client";

import OrderForm from "@/components/OrderForm";
import { FormEvent, useEffect, useState } from "react";

const EditOrder = ({ params }: { params: { id: string } }) => {
  const id = params.id;
  const [orderData, setOrderData] = useState({
    clientName: "",
    address: "",
    taxpayerNumber: "",
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

  return (
    <div>
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
