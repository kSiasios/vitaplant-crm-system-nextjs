import { NextApiRequest } from "next"

export const GET = async () => {
    const res = {
        message: "Hello from my API!"
    }

    return new Response(JSON.stringify(res), {
        status: 200
    })
}

export const POST = async (req: Request) => {
    const res = {
        message: "Hello from my API (POST METHOD)!"
    }

    const reqData = await req.json()

    return new Response(JSON.stringify(reqData), {
        status: 200
    })
}