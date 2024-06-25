"use client";

import { Item, paymentStatusMap, statusMap } from "@/utils/helper";
import { FormEvent, useEffect, useState } from "react";
import { BsFillTelephoneFill } from "react-icons/bs";
import { IoIosPin, IoMdPerson } from "react-icons/io";
import { LuPackageOpen } from "react-icons/lu";
import { PiIdentificationCardFill } from "react-icons/pi";
import { TbCurrencyEuro } from "react-icons/tb";
import OrderItemEntry from "./OrderItemEntry";

interface OrderFormProps {
  handleSubmit: any;
  type: string;
  orderData?: any;
  loading?: boolean;
  success?: boolean;
  error?: boolean;
}

const OrderForm = ({
  handleSubmit,
  type,
  orderData,
  loading,
  success,
  error,
}: OrderFormProps) => {
  const [formData, setFormData] = useState<any>({
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

  const [newFormData, setNewFormData] = useState({
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

  const handleChange = (
    field: string,
    value: object | string | number | boolean
  ) => {
    setNewFormData({
      ...newFormData,
      [field]: value,
    });
  };

  useEffect(() => {
    if (orderData) {
      setFormData(orderData);
    }
  }, [orderData]);

  useEffect(() => {
    setNewFormData(formData);
  }, [formData]);

  useEffect(() => {
    setFormData({
      ...formData,
      status: Object.keys(statusMap)[0],
      paymentStatus: Object.keys(paymentStatusMap)[0],
    });
  }, []);

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
      <label className="inline-flex justify-center items-center gap-2 w-full">
        <IoMdPerson />
        <input
          className="w-full"
          required={true}
          placeholder="Όνομα Πελάτη"
          name="clientName"
          value={newFormData.clientName}
          onChange={(e) => handleChange("clientName", e.target.value)}
        />
      </label>
      <label className="inline-flex justify-center items-center gap-2 w-full">
        <IoIosPin />
        <input
          className="w-full"
          required={true}
          placeholder="Διεύθυνση"
          name="address"
          value={newFormData.address}
          onChange={(e) => handleChange("address", e.target.value)}
        />
      </label>
      <label className="inline-flex justify-center items-center gap-2 w-full">
        <PiIdentificationCardFill />
        <input
          className="w-full"
          placeholder="ΑΦΜ"
          name="taxpayerNumber"
          value={newFormData.taxpayerNumber}
          onChange={(e) => handleChange("taxpayerNumber", e.target.value)}
        />
      </label>
      <label className="inline-flex justify-center items-center gap-2 w-full">
        <BsFillTelephoneFill />
        <input
          className="w-full"
          placeholder="Τηλέφωνο"
          name="phone"
          type="tel"
          value={newFormData.phone}
          onChange={(e) => handleChange("phone", e.target.value)}
        />
      </label>
      <label className="inline-flex justify-center items-center gap-2 w-full">
        <LuPackageOpen />
        <select
          className="w-full"
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
      </label>
      <label className="inline-flex justify-center items-center gap-2 w-full">
        <TbCurrencyEuro />
        <select
          className="w-full"
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
      </label>
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
          isOrder={true}
          editable={type}
        />
      </div>
      <button
        className="bg-white border border-black rounded-full px-6 py-3 hover:bg-black hover:text-white focus:bg-black focus:text-white"
        type="submit"
      >
        {!loading && success && !error && "Έγινε Αποθήκευση!"}
        {!loading && !success && error && "Σφάλμα Αποθήκευσης!"}
        {loading && "Γίνεται Αποθήκευση..."}
        {!loading && !success && !error && "Αποθήκευση"}
      </button>
    </form>
  );
};

export default OrderForm;
