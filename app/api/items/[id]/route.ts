import Item from "@/models/item.model";
import { connectToDB } from "@/utils/database";
import { NextResponse } from "next/server";

export const GET = async (
  req: Request,
  { params }: { params: { id: string } }
) => {
  const { id } = params;

  try {
    await connectToDB();
    const item = await Item.findOne({ _id: id });

    if (!item) {
      return NextResponse.json(
        {
          error: `Item with ID(${id}) not found!`,
        },
        {
          status: 404,
        }
      );
    }

    return new Response(JSON.stringify(item));
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

  let itemData = await req.json();

  const updatedData = itemData.data;

  delete updatedData._id;
  delete updatedData.__v;

  try {
    await connectToDB();
    const order = await Item.updateOne({ _id: id }, updatedData);

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

export const DELETE = async (
  req: Request,
  { params }: { params: { id: string } }
) => {
  const { id } = params;

  try {
    await connectToDB();
    const deleteRequest = await Item.deleteOne({ _id: id });

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
