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
  console.log(items.map((item) => item.subject));
  return (
    <div>
      Items
      <div>
        {items.map((item, index) => (
          <OrderItemEntry
            newItem={false}
            item={{
              subject: item.subject,
              variety: item.variety,
              price: item.price,
              amount: item.amount,
              ownStock: item.ownStock,
            }}
            key={index}
            editable={false}
            availableSubjects={items.map((item) => item.subject)}
            availableVarieties={items.map((item) => item.variety)}
          />
        ))}
      </div>
    </div>
  );
};

export default Items;
