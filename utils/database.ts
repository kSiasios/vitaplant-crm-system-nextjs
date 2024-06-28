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

export const updateStock = async (items: any, operation: string) => {
  await connectToDB();
  for (let index = 0; index < items.length; index++) {
    const item = items[index];

    let inStorage = await Item.findOne({
      plant: item.plant,
      subject: item.subject,
      variety: item.variety,
    });

    if (item.stock.own !== "true") {
      inStorage = await Item.findOne({
        plant: item.plant,
        subject: item.subject,
        variety: item.variety,
        "stock.distributor": item.stock.distributor,
      });
    }

    if (inStorage) {
      // update stock

      const difference =
        parseInt(item.amount) - parseInt(inStorage.currentAmount);
      // if (operation === "add") {
      //   newAmount = parseInt(inStorage.currentAmount) + parseInt(item.amount);
      // } else if (operation === "subtract") {
      //   newAmount = parseInt(inStorage.currentAmount) - parseInt(item.amount);
      // } else if (operation === "edit") {
      //   newAmount = parseInt(inStorage.currentAmount) - parseInt(item.amount);

      //   console.log(
      //     `${parseInt(inStorage.currentAmount)} - ${parseInt(
      //       item.amount
      //     )} = ${newAmount}`
      //   );

      //   // newAmount =
      //   //   parseInt(inStorage.currentAmount) +
      //   //   (parseInt(inStorage.currentAmount) - parseInt(item.amount));
      //   // newAmount = parseInt(inStorage.currentAmount) - parseInt(item.amount);
      //   // if (parseInt(item.amount) > 0) {
      //   //   // the amount was reduced, we need to add
      //   //   newAmount = parseInt(item.amount);
      //   // } else {
      //   //   newAmount = parseInt(inStorage.currentAmount) - parseInt(item.amount);
      //   // }
      // }

      let itemUpdate;
      if (item.stock.own === "true") {
        itemUpdate = await Item.updateOne(
          {
            plant: item.plant,
            subject: item.subject,
            variety: item.variety,
          },
          {
            $inc: { currentAmount: -difference },
          }
        );
      } else {
        itemUpdate = await Item.updateOne(
          {
            plant: item.plant,
            subject: item.subject,
            variety: item.variety,
            "stock.distributor": item.stock.distributor,
          },
          {
            $inc: { currentAmount: -difference },
          }
        );
      }

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

export function getDifferencesInItems(oldItems: any, newItems: any) {
  const dummyItems: Array<any> = [];

  // console.log(oldItems);

  oldItems.forEach((item: any, index: number) => {
    const found = newItems.find(
      (foundItem: any) =>
        foundItem.plant === item.plant &&
        foundItem.subject === item.subject &&
        foundItem.variety === item.variety &&
        foundItem.stock.distributor === item.stock.distributor
      // &&(foundItem.amount <= item.amount || foundItem.price !== item.price)
    );
    if (found) {
      // console.log(found);
      // console.log(item);

      // found.amount = found.amount - item.amount;
      dummyItems.push(found);
      dummyItems[index].amount = dummyItems[index].amount - item.amount;
      console.log(dummyItems[index]);
    }
  });

  return dummyItems;
}

// const differences = getDifferences(array1, array2);

// console.log("Items only in array1:", differences.onlyInArr1);
// console.log("Items only in array2:", differences.onlyInArr2);
