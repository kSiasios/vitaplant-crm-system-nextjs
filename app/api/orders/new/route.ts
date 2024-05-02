import Order from "@/models/order.model";
import { connectToDB } from "@/utils/database";

export const POST = async (req: Request) => {
    // console.log(req.json())

    let orderData = await req.json();
    console.log(orderData);

    try {
        await connectToDB();
        const order = await Order.create(orderData);
        const res = new Response(
            JSON.stringify({ message: 'Resource created successfully', order }),
            { status: 201 }
        );

        return res;

    } catch (error) {
        console.log(error);
        return false;
    }


}