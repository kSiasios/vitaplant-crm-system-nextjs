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
  for (let index = 0; index < itemData.length; index++) {
    const item = itemData[index];
    if (
      item.subject == "" ||
      item.variety == "" ||
      item.amount <= 0 ||
      item.price <= 0 ||
      item.ownStock == undefined
    ) {
      return new Response(
        JSON.stringify({
          message: "Some Data are not provided!",
        }),
        {
          status: 500,
        }
      );
    }

    if (!item.ownStock) {
      return new Response(
        JSON.stringify({
          message: "The Stock must be owned by the company!",
        }),
        {
          status: 500,
        }
      );
    }
  }

  try {
    await connectToDB();
    const item = await Item.insertMany(itemObject);
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
