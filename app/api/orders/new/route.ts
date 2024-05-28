import Item from "@/models/item.model";
import Order from "@/models/order.model";
import { connectToDB } from "@/utils/database";

export const POST = async (req: Request) => {
  let orderData = await req.json();
  console.log(orderData);

  const orderObject = {
    clientName: orderData.clientName,
    address: orderData.address,
    taxpayerNumber: orderData.afm,
    status: orderData.orderStatus,
    paymentStatus: orderData.paymentStatus,
    paymentAmount: orderData.paymentAmount,
    created: {
      by: "admin",
      at: `${new Date()}`,
    },
    items: [...orderData.items],
  };

  console.log(orderObject);

  try {
    await connectToDB();

    for (let index = 0; index < orderObject.items.length; index++) {
      const item = orderObject.items[index];
      const inStorage = await Item.findOne({
        subject: item.subject,
        variety: item.variety,
      });
      console.log(inStorage);
      if (!inStorage && item.stock.own) {
        return new Response(
          JSON.stringify({ error: "Item not found in storage!", item }),
          { status: 500 }
        );
      }

      if (item.stock.own && inStorage.amount < item.amount) {
        return new Response(
          JSON.stringify({ error: "Item amount is too much!", item }),
          { status: 500 }
        );
      }
    }

    const order = await Order.create(orderObject);

    for (let index = 0; index < orderObject.items.length; index++) {
      const item = orderObject.items[index];
      const inStorage = await Item.findOne({
        subject: item.subject,
        variety: item.variety,
      });
      if (inStorage) {
        // update stock
        const itemUpdate = await Item.updateOne(
          {
            subject: item.subject,
            variety: item.variety,
          },
          {
            amount: inStorage.amount - item.amount,
          }
        );

        if (!itemUpdate) {
          return new Response(
            // JSON.stringify({ message: "Resource created successfully" }),
            JSON.stringify({ error: "Error upon item update!", item }),
            { status: 500 }
          );
        }
      }
    }

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
