import Item from "@/models/item.model";
import { connectToDB } from "@/utils/database";

export const GET = async () => {
  try {
    await connectToDB();
    const items = await Item.find({});

    return new Response(JSON.stringify(items));
  } catch (error) {
    console.log(error);
    // return false;
    return new Response(
      JSON.stringify({
        message: "An error occured!",
        error,
      })
    );
  }
};

export const POST = async (req: Request) => {
  // console.log(req.json())

  let itemData = await req.json();
  console.log(itemData);

  for (let index = 0; index < itemData.length; index++) {
    const item = itemData[index];
    if (
      item.subject == "" ||
      item.variety == "" ||
      item.amount <= 0 ||
      item.price <= 0 ||
      item.stock == undefined
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
  }

  try {
    await connectToDB();
    const item = await Item.insertMany(itemData);
    const res = new Response(
      JSON.stringify({ message: "Resource created successfully", item }),
      { status: 201 }
    );

    return res;
  } catch (error) {
    console.log(error);
    return new Response(JSON.stringify({ error }), { status: 500 });
  }
};
