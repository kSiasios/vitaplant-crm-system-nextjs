import Item from "@/models/item.model";
import Order from "@/models/order.model";
import { connectToDB, updateStock } from "@/utils/database";

export const GET = async () => {
  try {
    await connectToDB();
    const orders = await Order.find({});

    return new Response(JSON.stringify(orders));
  } catch (error) {
    console.log(error);
    return new Response(
      JSON.stringify({
        message: "An error occured!",
        error,
      })
    );
  }
};

export const POST = async (req: Request) => {
  let orderData = await req.json();
  console.log(orderData);

  const orderObject = {
    clientName: orderData.clientName,
    address: orderData.address,
    taxpayerNumber: orderData.taxpayerNumber,
    phone: orderData.phone,
    status: orderData.status,
    paymentStatus: orderData.paymentStatus,
    paymentAmount:
      orderData.paymentAmount === "" ? "0" : orderData.paymentAmount,
    created: {
      by: "admin",
      at: `${new Date()}`,
    },
    items: [...orderData.items],
    comments: orderData.comments,
  };

  try {
    await connectToDB();

    for (let index = 0; index < orderObject.items.length; index++) {
      const item = orderObject.items[index];
      const inStorage = await Item.findOne({
        plant: item.plant,
        subject: item.subject,
        variety: item.variety,
      });
      if (!inStorage && item.stock.own) {
        return new Response(
          JSON.stringify({ error: "Item not found in storage!", item }),
          { status: 500 }
        );
      }

      if (item.stock.own && inStorage.currentAmount < item.amount) {
        return new Response(
          JSON.stringify({ error: "Item amount is too much!", item }),
          { status: 500 }
        );
      }
    }

    const order = await Order.create(orderObject);

    await updateStock(orderObject, "subtract");

    const res = new Response(
      // JSON.stringify({ message: "Resource created successfully" }),
      JSON.stringify({ message: "Resource created successfully", order }),
      { status: 201 }
    );

    return res;
  } catch (error) {
    console.log(error);
    const res = new Response(JSON.stringify({ error }), { status: 500 });
    return res;
  }
};
