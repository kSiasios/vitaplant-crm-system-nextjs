async function getData() {
  // const res = await fetch("https://.../posts");
  // const items = await res.json();

  const items = [
    {
      "1": "One",
    },
    {
      "2": "Two",
    },
  ];

  return {
    props: {
      items,
    },
  };
}

const Items = async () => {
  const items = await getData();
  console.log(items);
  return <div>Items</div>;
};

export default Items;
