import Item from "@/models/item.model";
import { connectToDB } from "@/utils/database";

export const GET = async () => {
  try {
    await connectToDB();
    const items = await Item.find({});

    return new Response(JSON.stringify(items));
  } catch (error) {
    console.log(error);
    return false;
  }
};
