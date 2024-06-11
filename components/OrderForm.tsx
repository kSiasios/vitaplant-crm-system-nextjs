"use client";

import { paymentStatusMap, statusMap } from "@/utils/helper";
import { FormEvent, useEffect, useState } from "react";
import { Item } from "./OrderItem";
import OrderItemEntry from "./OrderItemEntry";

interface OrderFormProps {
  handleSubmit: any;
  type: String;
  orderData?: any;
}

const OrderForm = ({ handleSubmit, type, orderData }: OrderFormProps) => {
  const [formData, setFormData] = useState({
    clientName: "",
    address: "",
    taxpayerNumber: "",
    status: "",
    paymentAmount: "",
    paymentStatus: "",
    comments: "",
    items: [{}],
  });

  const [newFormData, setNewFormData] = useState({
    clientName: "",
    address: "",
    taxpayerNumber: "",
    status: "",
    paymentAmount: "",
    paymentStatus: "",
    comments: "",
    items: [{}],
  });

  const handleChange = (
    field: string,
    value: object | string | number | boolean
  ) => {
    // console.log(value);

    // setFormData({
    //   ...formData,
    //   [field]: value,
    // });
    setNewFormData({
      ...newFormData,
      [field]: value,
    });
  };

  useEffect(() => {
    // console.log(orderData);

    if (orderData) {
      setFormData(orderData);
    }
  }, [orderData]);

  useEffect(() => {
    // console.log(orderData);

    // if (orderData) {
    setNewFormData(formData);
    // }
  }, [formData]);

  const getOrderItems = (data: Array<Object>) => {
    handleChange("items", data);
  };

  const submitForm = (e: FormEvent) => {
    e.preventDefault();

    handleSubmit(newFormData, e);
  };

  return (
    <form
      onSubmit={submitForm}
      className="flex flex-col max-w-[500px] mx-auto border border-gray-400 rounded-lg p-8 gap-4 bg-white"
    >
      <input
        required={true}
        placeholder="Όνομα Πελάτη"
        name="clientName"
        value={newFormData.clientName}
        onChange={(e) => handleChange("clientName", e.target.value)}
      />
      <input
        required={true}
        placeholder="Διεύθυνση"
        name="address"
        value={newFormData.address}
        onChange={(e) => handleChange("address", e.target.value)}
      />
      <input
        placeholder="ΑΦΜ"
        name="taxpayerNumber"
        value={newFormData.taxpayerNumber}
        onChange={(e) => handleChange("taxpayerNumber", e.target.value)}
      />
      <select
        required={true}
        value={newFormData.status}
        name="status"
        onChange={(e) => {
          handleChange("status", e.target.value);
        }}
      >
        <option value="registered">{statusMap["registered"]}</option>
        <option value="packed">{statusMap["packed"]}</option>
        <option value="complete">{statusMap["complete"]}</option>
      </select>
      <div className="flex gap-2">
        {/* <label>Order Status</label> */}
        <select
          className="flex-1"
          required={true}
          value={newFormData.paymentStatus}
          name="paymentStatus"
          onChange={(e) => {
            handleChange("paymentStatus", e.target.value);
          }}
        >
          <option value="due">{paymentStatusMap["due"]}</option>
          <option value="in-advance">{paymentStatusMap["in-advance"]}</option>
          <option value="complete">{paymentStatusMap["complete"]}</option>
        </select>
        {newFormData.paymentStatus === "in-advance" && (
          <input
            className="flex-1"
            value={newFormData.paymentAmount}
            name="paymentAmount"
            onChange={(e) =>
              handleChange(
                "paymentAmount",
                parseInt(e.target.value) ? parseInt(e.target.value) : 0
              )
            }
            placeholder="Ποσό Προκαταβολής"
          />
        )}
      </div>
      <div className="flex flex-col gap-2">
        <label htmlFor="comments">Σχόλια</label>
        <textarea
          name="comments"
          id="comments"
          value={newFormData.comments}
          onChange={(e) => handleChange("comments", e.target.value)}
          placeholder="Σχόλια..."
        ></textarea>
      </div>
      <div>
        <OrderItemEntry
          handleChange={getOrderItems}
          providedSections={formData.items as Item[]}
        />
      </div>
      <button
        className="bg-white border border-black rounded-full px-6 py-3 hover:bg-black hover:text-white focus:bg-black focus:text-white"
        type="submit"
      >
        Αποθήκευση
      </button>
    </form>
  );
};

export default OrderForm;
