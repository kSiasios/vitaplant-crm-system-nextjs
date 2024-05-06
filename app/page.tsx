"use client";

import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";

import OrderItem, { Item } from "@/components/OrderItem";
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
import { IoAdd, IoLogOutOutline } from "react-icons/io5";

const Home = () => {
  // const isUserLoggedIn = false;
  const { data: session } = useSession();
  const [ordersData, setOrdersData] = useState([]);

  const router = useRouter();

  const [providers, setProviders] = useState<Record<
    LiteralUnion<BuiltInProviderType, string>,
    ClientSafeProvider
  > | null>(null);

  const [filter, setFilter] = useState("");
  const [orders, setOrders] = useState<any>([]);

  function resetFilter() {
    setOrders(Object.values(ordersData));
  }

  function checkItemsFilter(items: Array<Item>, filter: string) {
    for (let index = 0; index < items.length; index++) {
      const item = items[index];
      if (
        item.subject.toLowerCase().includes(filter.toLowerCase()) ||
        item.variety.toLowerCase().includes(filter.toLowerCase())
      ) {
        return true;
      }
    }

    return false;
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
          order.clientName.toLowerCase().includes(filter.toLowerCase()) ||
          checkItemsFilter(order.items, filter)
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

    const fetchOrders = async () => {
      const res = await fetch("/api/orders");
      const data = await res.json();
      // console.log(data);
      setOrdersData(data);
    };

    const setUpProviders = async () => {
      const response = await getProviders();
      setProviders(response);

      console.log(response);
    };

    if (!frontEndDev) {
      setUpProviders();
    }
    fetchOrders();
    // resetFilter();
  }, []);

  useEffect(() => {
    resetFilter();
  }, [ordersData]);

  const newOrderNav = () => router.push("/orders/new");

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
            <div className="flex justify-between items-center">
              {/* Orders title bar */}
              <h3 className="font-bold text-2xl">Orders</h3>
              <div className="flex gap-1">
                {/* Actions */}
                <button
                  className="bg-gray-100 border border-blue-500 text-blue-500 font-bold hover:bg-blue-500 focus:bg-blue-500 hover:text-white focus:text-white p-4 rounded-lg text-lg"
                  type="submit"
                  onClick={newOrderNav}
                >
                  {/* New Order */}
                  <IoAdd />
                </button>
                <button
                  type="button"
                  onClick={() => {
                    if (!frontEndDev) {
                      signOut();
                    }
                  }}
                  className="border border-black rounded-lg p-4 hover:bg-black hover:text-white focus:bg-black focus:text-white text-lg"
                >
                  {/* Sign Out */}
                  <IoLogOutOutline />
                </button>
              </div>
            </div>
            <div className="p-4">
              <section className="overflow-y-visible flex flex-col gap-4">
                {orders &&
                  Object.values(orders).map((order: any) => (
                    // <div key={index}>{order.name}</div>
                    <OrderItem
                      key={order._id}
                      clientName={order.clientName}
                      orderID={order._id}
                      items={order.items}
                      status={order.status}
                      paymentStatus={order.paymentStatus}
                    />
                  ))}
                {orders.length === 0 && <div>LOADING</div>}
              </section>
            </div>
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
