"use client";

import React, { useEffect, useState } from "react";

interface OrderFormProps {
  handleSubmit: React.FormEventHandler<HTMLFormElement>;
  type: String;
}

const OrderForm = ({ handleSubmit, type }: OrderFormProps) => {
  // const {clientName, address, afm, product, price, comments} = useState({});
  const [orderStatus, setOrderStatus] = useState("registered");
  const [paymentStatus, setPaymentStatus] = useState("due");
  const [paymentAmount, setPaymentAmount] = useState(undefined);
  // console.log(type);
  // useEffect(() => {
  //   console.log(orderStatus);
  // }, [orderStatus]);
  return (
    <form
      onSubmit={handleSubmit}
      className="flex flex-col max-w-[500px] mx-auto border border-gray-400 rounded-lg p-8 gap-4"
    >
      <input
        className="px-3 py-2 rounded-lg border border-gray-400"
        required={true}
        placeholder="Client"
      />
      <select
        className="px-3 py-2 rounded-lg border border-gray-400 bg-none"
        required={true}
        value={orderStatus}
        onChange={(e) => {
          setOrderStatus(e.target.value);
        }}
        // placeholder="Status"
      >
        <option value="registered" selected>
          Registered
        </option>
        <option value="packed">Packed</option>
        <option value="complete">Complete</option>
      </select>
      <div className="flex gap-2">
        <select
          className="flex-1 px-3 py-2 rounded-lg border border-gray-400 bg-none"
          required={true}
          value={paymentStatus}
          onChange={(e) => {
            setPaymentStatus(e.target.value);
          }}
          // placeholder="Status"
        >
          <option value="due" selected>
            Due
          </option>
          <option value="in-advance">In Advance</option>
          <option value="complete">Complete</option>
        </select>
        {paymentStatus === "in-advance" && (
          <input
            className="flex-1 px-3 py-2 rounded-lg border border-gray-400"
            value={paymentAmount}
            placeholder="Payment Amount"
          />
        )}
      </div>
      <></>
      <button className="px-3 py-2 rounded-lg bg-white/40" type="submit">
        CLICK TO SUBMIT
      </button>
    </form>
  );
};

export default OrderForm;
