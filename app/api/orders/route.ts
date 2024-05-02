import Order from "@/models/order.model";
import { connectToDB } from "@/utils/database";

export const GET = async () => {
    try {
        await connectToDB();
        const orders = await Order.find({});
        
        return new Response(JSON.stringify(orders))
      } catch (error) {
        console.log(error);
        return false;
      }
}