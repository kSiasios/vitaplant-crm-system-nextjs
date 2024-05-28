import Order from "@/models/order.model";
import { connectToDB } from "@/utils/database";
import { ObjectId } from "mongodb";

export const POST = async (
  req: Request,
  { params }: { params: { id: string } }
) => {
  // const data = await req.json;
  // console.log(data);
  //   const orderID = data.id;
  let id = parseInt(params.id);

  console.log(id);

  let orderData = await req.json();

  // return new Response(JSON.stringify({ id: id, orderData }));

  try {
    await connectToDB();
    const exists = await Order.findById(new ObjectId(id));
    console.log(exists);

    if (!exists) {
      return new Response(JSON.stringify({ error: "Order not found!" }), {
        status: 500,
      });
    }

    const order = Order.updateOne({ _id: id }, orderData);

    return new Response(JSON.stringify({ message: "Order Updated!", order }), {
      status: 201,
    });
  } catch (error) {
    console.log(error);
    return new Response(JSON.stringify({ error }), {
      status: 500,
    });
    // return false;
  }
};
