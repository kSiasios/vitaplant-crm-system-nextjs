import { Item } from "@/components/OrderItem";

async function getData() {
  // const res = await fetch("https://.../posts");
  // const items = await res.json();

  const res = await fetch(`${process.env.URL}/api/items`, {
    method: "GET",
  });
  const items = await res.json();
  return items;
}

const Items = async () => {
  const items: Array<Item> = await getData();
  // console.log(items);
  return (
    <div>
      Items
      <div>
        {items.map((item) => (
          <>{item.subject}</>
        ))}
      </div>
    </div>
  );
};

export default Items;
