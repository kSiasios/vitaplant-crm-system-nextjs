"use client";

import React from "react";

interface OrderFormProps {
  handleSubmit: React.FormEventHandler<HTMLFormElement>;
  type: String;
}

const OrderForm = ({ handleSubmit, type }: OrderFormProps) => {
  // const {clientName, address, afm, product, price, comments} = useState({});
  console.log(type);
  return (
    <form
      onSubmit={handleSubmit}
      className="flex flex-col max-w-[500px] mx-auto bg-violet-300 p-8 gap-4"
    >
      <input required={true} placeholder="Client" />
      <input required={true} placeholder="Status" />
      <input required={true} placeholder="Payment Status" />
      <button className="bg-white/40" type="submit">
        CLICK TO SUBMIT
      </button>
    </form>
  );
};

export default OrderForm;
