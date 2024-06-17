import User from "@/models/user.model";
import { connectToDB } from "@/utils/database";
import * as bcrypt from "bcrypt";

interface UserData {
  username: string;
  email: string;
  password: string;
  isAdmin: boolean;
}

export async function POST(req: Request) {
  const body: UserData = await req.json();

  try {
    await connectToDB();
    const data = {
      username: body.username,
      email: body.email,
      password: await bcrypt.hash(body.password, 10),
      isAdmin: body.isAdmin,
    };
    const user = await User.create(data);
    const res = new Response(
      JSON.stringify({ message: "User created successfully", user }),
      { status: 201 }
    );

    return res;
  } catch (error) {
    console.log(error);
    return new Response(JSON.stringify({ error }), { status: 500 });
  }
}
