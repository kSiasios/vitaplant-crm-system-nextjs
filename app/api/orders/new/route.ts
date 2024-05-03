import Order from "@/models/order.model";
import { connectToDB } from "@/utils/database";

export const POST = async (req: Request) => {
  // console.log(req.json())

  let orderData = await req.json();
  console.log(orderData);

  const orderObject = {
    clientName: orderData.clientName,
    address: orderData.address,
    taxpayerNumber: orderData.afm,
    status: orderData.orderStatus,
    paymentStatus: orderData.paymentStatus,
    paymentAmount: orderData.paymentAmount,
    items: [...orderData.items],
  };

  console.log(orderObject);

  try {
    await connectToDB();
    const order = await Order.create(orderObject);
    const res = new Response(
      JSON.stringify({ message: "Resource created successfully", order }),
      { status: 201 }
    );

    return res;
  } catch (error) {
    console.log(error);
    return false;
  }
};
