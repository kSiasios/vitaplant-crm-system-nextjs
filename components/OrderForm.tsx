"use client";

import { FormEvent, useState } from "react";
import OrderItemEntry from "./OrderItemEntry";

interface OrderFormProps {
  handleSubmit: any;
  type: String;
}

const OrderForm = ({ handleSubmit, type }: OrderFormProps) => {
  // const {clientName, address, afm, product, price, comments} = useState({});
  const [clientName, setClientName] = useState("");
  const [address, setAddress] = useState("");
  const [afm, setAFM] = useState("");
  const [orderStatus, setOrderStatus] = useState("registered");
  const [paymentStatus, setPaymentStatus] = useState("due");
  const [paymentAmount, setPaymentAmount] = useState(undefined);

  const [orderItems, setOrderItems] = useState([{}]);
  // console.log(type);
  // useEffect(() => {
  //   console.log(orderStatus);
  // }, [orderStatus]);

  const getOrderItems = (data: Array<Object>) => {
    setOrderItems(data);
  };

  // useEffect(() => {
  //   console.log(orderItems);
  // }, [orderItems]);

  const submitForm = (e: FormEvent) => {
    e.preventDefault();

    const data = {
      clientName,
      address,
      afm,
      items: orderItems,
    };

    handleSubmit(data, e);
  };

  return (
    <form
      onSubmit={submitForm}
      className="flex flex-col max-w-[500px] mx-auto border border-gray-400 rounded-lg p-8 gap-4"
    >
      <input
        required={true}
        placeholder="Client"
        value={clientName}
        onChange={(e) => setClientName(e.target.value)}
      />
      <input
        required={true}
        placeholder="Address"
        value={address}
        onChange={(e) => setAddress(e.target.value)}
      />
      <input
        placeholder="AFM"
        value={afm}
        onChange={(e) => setAFM(e.target.value)}
      />
      <select
        required={true}
        value={orderStatus}
        onChange={(e) => {
          setOrderStatus(e.target.value);
        }}
        // defaultValue="registered"
        // placeholder="Status"
      >
        <option value="registered">Registered</option>
        <option value="packed">Packed</option>
        <option value="complete">Complete</option>
      </select>
      <div className="flex gap-2">
        {/* <label>Order Status</label> */}
        <select
          className="flex-1"
          required={true}
          value={paymentStatus}
          onChange={(e) => {
            setPaymentStatus(e.target.value);
          }}
          // defaultValue="due"
          // placeholder="Status"
        >
          <option value="due">Due</option>
          <option value="in-advance">In Advance</option>
          <option value="complete">Complete</option>
        </select>
        {paymentStatus === "in-advance" && (
          <input
            className="flex-1"
            value={paymentAmount}
            placeholder="Payment Amount"
          />
        )}
      </div>
      <div>
        <OrderItemEntry handleChange={getOrderItems} />
      </div>
      <button className="px-3 py-2 rounded-lg bg-gray-300" type="submit">
        CLICK TO SUBMIT
      </button>
    </form>
  );
};

export default OrderForm;
