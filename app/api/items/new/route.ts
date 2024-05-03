import Item from "@/models/item.model";
import { connectToDB } from "@/utils/database";

export const POST = async (req: Request) => {
  // console.log(req.json())

  let itemData = await req.json();
  console.log(itemData);

  const itemObject = {
    subject: itemData.subject,
    variety: itemData.variety,
    price: itemData.price,
    amount: itemData.amount,
    ownStock: itemData.ownStock,
  };

  console.log(itemObject);

  try {
    await connectToDB();
    const item = await Item.create(itemObject);
    const res = new Response(
      JSON.stringify({ message: "Resource created successfully", item }),
      { status: 201 }
    );

    return res;
  } catch (error) {
    console.log(error);
    return false;
  }
};
