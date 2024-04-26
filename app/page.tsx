"use client";

import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";

import OrderItem from "@/components/OrderItem";
import frontEndDev from "@/utils/environment";
import { BuiltInProviderType } from "next-auth/providers/index";
import {
  ClientSafeProvider,
  getProviders,
  LiteralUnion,
  signIn,
  signOut,
  useSession,
} from "next-auth/react";

const Home = () => {
  // const isUserLoggedIn = false;
  const { data: session } = useSession();

  const router = useRouter();
  const ordersData = {
    0: {
      name: "Giorgos",
      product: "apple tree",
      quantity: "10",
      price: "2.5",
      payment: { status: "full", amount: "" },
      status: "completed",
    },
    1: {
      name: "Marios",
      product: "jasmine",
      quantity: "5",
      price: "4",
      payment: { status: "due", amount: "" },
      status: "registered",
    },
    2: {
      name: "Ioanna",
      product: "orange tree",
      quantity: "15",
      price: "3.5",
      payment: { status: "in advance", amount: "20" },
      status: "completed",
    },
    3: {
      name: "Giorgos",
      product: "lemon tree",
      quantity: "3",
      price: "4",
      payment: { status: "due", amount: "" },
      status: "packed",
    },
    4: {
      name: "Ioanna",
      product: "apple tree",
      quantity: "100",
      price: "5.6",
      payment: { status: "full", amount: "" },
      status: "packed",
    },
  };

  const [providers, setProviders] = useState<Record<
    LiteralUnion<BuiltInProviderType, string>,
    ClientSafeProvider
  > | null>(null);

  const [filter, setFilter] = useState("");
  const [orders, setOrders] = useState<any>([]);

  function resetFilter() {
    setOrders(Object.values(ordersData));
  }

  function filterOrders(e?: any) {
    e?.preventDefault();
    const prev = Object.values(ordersData);
    if (!prev || prev == undefined) {
      return;
    }

    if (filter === "") {
      return;
    }

    setOrders(
      prev.filter((order: any) => {
        return (
          order.name.toLowerCase().includes(filter.toLowerCase()) ||
          order.product.toLowerCase().includes(filter.toLowerCase())
        );
      })
    );
  }

  function updateFilter(e: any) {
    e.preventDefault();
    setFilter(e.target.value);
    if (e.target.value === "") {
      resetFilter();
      return;
    }
  }

  useEffect(() => {
    // fetch orders data
    // set orders to the fetched data
    // console.log("USE EFFECT");

    const setUpProviders = async () => {
      const response = await getProviders();
      setProviders(response);

      console.log(response);
    };

    if (!frontEndDev) {
      setUpProviders();
    }

    resetFilter();
  }, []);

  useEffect(() => {
    filterOrders();
  }, [filter]);

  return (
    <>
      {session?.user ||
        (frontEndDev && (
          <section className="flex flex-col gap-4 mx-auto pt-16 max-w-[500px]">
            <p className="text-4xl font-thin">
              Hello, <span className="font-bold">{session?.user?.name}</span>
            </p>
            <form
              onSubmit={filterOrders}
              className="w-full flex items-center justify-center gap-2"
            >
              <input
                className="px-4 py-2 border border-gray-300 rounded-lg"
                placeholder="Search Order..."
                value={filter}
                onChange={updateFilter}
              ></input>
              <button
                className="bg-gray-100 border border-blue-500 text-blue-500 font-bold hover:bg-blue-500 focus:bg-blue-500 hover:text-white focus:text-white px-4 py-2 rounded-lg"
                type="submit"
              >
                Filter
              </button>
            </form>
            <h3 className="font-bold text-2xl">Orders</h3>
            <div className="bg-gray-200 px-4 py-4">
              <section className="max-h-[100px] overflow-y-scroll flex flex-col gap-4">
                {orders &&
                  Object.values(orders).map((order: any, index) => (
                    // <div key={index}>{order.name}</div>
                    <OrderItem
                      key={index}
                      clientName={order.name}
                      orderID={index.toString()}
                      items={[]}
                      status={order.status}
                      paymentStatus={order.payment}
                    />
                  ))}
              </section>
            </div>
            <button
              className="bg-gray-100 border border-blue-500 text-blue-500 font-bold hover:bg-blue-500 focus:bg-blue-500 hover:text-white focus:text-white px-4 py-2 rounded-lg"
              type="submit"
              onClick={() => router.push("/orders/new")}
            >
              New Order
            </button>
            <button
              type="button"
              onClick={() => {
                if (!frontEndDev) {
                  signOut();
                }
              }}
              className="border border-black rounded-full px-6 py-3 hover:bg-black hover:text-white focus:bg-black focus:text-white"
            >
              Sign Out
            </button>
          </section>
        ))}
      {!session?.user && !frontEndDev && (
        <section className="w-screen h-screen flex flex-col gap-8 items-center justify-center">
          <h1 className="font-bold text-3xl">You are not Authorized!</h1>
          {providers &&
            Object.values(providers).map((provider) => (
              <button
                type="button"
                key={provider.name}
                onClick={() => signIn(provider.id)}
                className="border border-black rounded-full px-6 py-3 hover:bg-black hover:text-white focus:bg-black focus:text-white"
              >
                Login with {provider.name}
              </button>
            ))}
        </section>
      )}
    </>
  );
};

export default Home;
