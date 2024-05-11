"use server";

import { Item } from "@/components/OrderItem";
import OrderItemEntry from "@/components/OrderItemEntry";

async function getData() {
  // const res = await fetch("https://.../posts");
  // const items = await res.json();

  const res = await fetch(`${process.env.URL}/api/items`);
  const items = await res.json();
  return items;
}

const Items = async () => {
  const items: Array<Item> = await getData();
  // console.log(items);
  // console.log(items.map((item) => item.subject));
  return (
    <div className="flex flex-col max-w-[500px] mx-auto">
      <h1 className="font-bold text-4xl w-full text-center my-4">Items</h1>
      <div>
        {items.map((item, idx) => (
          <OrderItemEntry
            newItem={false}
            item={{
              subject: item.subject,
              variety: item.variety,
              price: item.price,
              amount: item.amount,
              stock: item.stock,
            }}
            key={idx}
            editable={false}
            availableSubjects={[item.subject]}
            availableVarieties={[item.variety]}
          />
        ))}
      </div>
    </div>
  );
};

export default Items;
