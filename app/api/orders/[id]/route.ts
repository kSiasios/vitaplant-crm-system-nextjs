import Item from "@/models/item.model";
import Order from "@/models/order.model";
import { connectToDB, updateStock } from "@/utils/database";
import { NextResponse } from "next/server";

export const GET = async (
  req: Request,
  { params }: { params: { id: string } }
) => {
  // console.log(`GET by ID`);

  const { id } = params;

  // console.log(`ID: ${id}`);

  try {
    await connectToDB();
    const order = await Order.findOne({ _id: id });

    // console.log(order);

    if (!order) {
      return NextResponse.json(
        {
          error: `Order with ID(${id}) not found!`,
        },
        {
          status: 404,
        }
      );
    }

    return new Response(JSON.stringify(order));
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

export const PUT = async (
  req: Request,
  { params }: { params: { id: string } }
) => {
  const { id } = params;

  let orderData = await req.json();

  const updatedData = { ...orderData.data };

  try {
    await connectToDB();

    const oldOrder = await Order.findById(id);

    oldOrder.items.forEach(async (item: any) => {
      const newItem = updatedData.items.find(
        (i: any) =>
          i.plant === item.plant &&
          i.subject === item.subject &&
          i.variety === item.variety &&
          i.stock.distributor === item.stock.distributor
      );

      const difference = newItem.amount - item.amount;
      console.log(difference);

      const itemUpdate = await Item.updateOne(
        {
          plant: newItem.plant,
          subject: newItem.subject,
          variety: newItem.variety,
          "stock.distributor": newItem.stock.distributor,
        },
        {
          $inc: { currentAmount: -difference },
        }
      );
      if (!itemUpdate) {
        return new Response(JSON.stringify({ itemUpdate }), {
          status: 500,
        });
      }
    });

    // update order
    const orderUpdate = await Order.updateOne({ _id: id }, updatedData);

    return new Response(JSON.stringify(orderUpdate));
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

export const DELETE = async (
  req: Request,
  { params }: { params: { id: string } }
) => {
  const { id } = params;

  try {
    await connectToDB();

    // fetch order data
    const order = await Order.findById(id);

    updateStock(order.items, "add");

    const deleteRequest = await Order.deleteOne({ _id: id });

    return new Response(JSON.stringify(deleteRequest));
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
