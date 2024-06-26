import Item from "@/models/item.model";
import mongoose from "mongoose";

let isConnected = false;

export const connectToDB = async () => {
  mongoose.set("strictQuery", true);

  if (isConnected) {
    console.log("MongoDB is already connected!");
    return;
  }

  try {
    await mongoose.connect(
      process.env.MONGODB_URI ? process.env.MONGODB_URI : "",
      {
        dbName: "vitaplant_crm",
      }
    );
    isConnected = true;
    console.log("MongoDB connected!");
  } catch (error) {
    console.log(error);
  }
};

export const updateStock = async (orderObject: any, operation: string) => {
  await connectToDB();
  for (let index = 0; index < orderObject.items.length; index++) {
    const item = orderObject.items[index];

    const inStorage = await Item.findOne({
      plant: item.plant,
      subject: item.subject,
      variety: item.variety,
    });
    if (inStorage) {
      // update stock

      let newAmount =
        operation === "add"
          ? parseInt(inStorage.currentAmount) + parseInt(item.amount)
          : parseInt(inStorage.currentAmount) - parseInt(item.amount);

      const itemUpdate = await Item.updateOne(
        {
          plant: item.plant,
          subject: item.subject,
          variety: item.variety,
        },
        {
          currentAmount: newAmount,
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
};
