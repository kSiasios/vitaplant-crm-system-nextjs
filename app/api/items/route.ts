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

export const DELETE = async (req: Request) => {
  try {
    let data = await req.json();
    console.log(data);
    if (!data.id) {
      return new Response(JSON.stringify({ error: "No id provided" }), {
        status: 500,
      });
    }
    await connectToDB();
    const items = await Item.deleteOne({ _id: data.id });

    return new Response(JSON.stringify(items));
    // return new Response(JSON.stringify({ message: "Got it!" }));
  } catch (error) {
    console.log(error);
    return new Response(
      JSON.stringify({
        message: "An error occured upon deletion!",
        error,
      })
    );
  }
};
