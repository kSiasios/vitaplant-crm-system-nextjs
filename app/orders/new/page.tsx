"use client";
import OrderForm from "@/components/OrderForm";

const NewOrder = () => {
  function handleNewOrder(e?: any) {
    e?.preventDefault();
    console.log("new order!");
  }
  return (
    <div>
      <OrderForm handleSubmit={handleNewOrder} type="edit" />
    </div>
  );
};

export default NewOrder;
