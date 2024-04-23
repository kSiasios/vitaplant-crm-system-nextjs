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
    <form onSubmit={handleSubmit}>
      <button>CLICK TO SUBMIT</button>
    </form>
  );
};

export default OrderForm;
