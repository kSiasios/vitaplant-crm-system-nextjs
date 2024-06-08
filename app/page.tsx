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
  signOut,
  useSession,
} from "next-auth/react";
import Link from "next/link";
import { GrStorage } from "react-icons/gr";
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

      // console.log(res);

      if (!res.ok) {
        const resText = await res.text();
        console.error(resText);
        alert(`Error while fetching orders ${resText}`);
        return;
      }

      const data = await res.json();
      // console.log(data);
      setOrdersData(data);
    };

    const setUpProviders = async () => {
      const response = await getProviders();
      setProviders(response);

      // console.log(response);
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
      {/* <Link
        href="/settings"
        className="absolute right-0 m-4 p-2 rounded-full hover:animate-spin focus:animate-spin"
      >
        <FaGear />
      </Link> */}
      {frontEndDev ||
        (session?.user && (
          <section className="flex flex-col gap-4 mx-auto pt-16 max-w-[556px] bg-white rounded-2xl p-14 shadow-lg">
            <p className="text-4xl font-thin">
              Hello, <span className="font-bold">{session?.user?.name}</span>
            </p>

            <div className="inline-flex justify-between items-center">
              <h3 className="font-bold text-2xl">Orders</h3>
              <Link
                href="/items"
                className="inline-flex items-center gap-1 underline"
              >
                Storage <GrStorage />
              </Link>
            </div>
            <div className="flex justify-between items-center">
              {/* Orders title bar */}
              <form
                onSubmit={filterOrders}
                className="w-full flex items-center justify-start gap-2"
              >
                <input
                  className="px-4 py-2 border border-gray-300 rounded-lg"
                  placeholder="Search Order..."
                  value={filter}
                  onChange={updateFilter}
                ></input>
                {/* <button
                  className="bg-gray-100 border border-blue-500 text-blue-500 font-bold hover:bg-blue-500 focus:bg-blue-500 hover:text-white focus:text-white px-4 py-2 rounded-lg"
                  type="submit"
                >
                  Filter
                </button> */}
              </form>
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
            <div
            // className="p-4"
            >
              <section className="overflow-y-visible flex flex-col gap-4">
                {orders &&
                  Object.values(
                    orders.sort((a: any, b: any) => {
                      return a.paymentStatus - b.paymentStatus;
                    })
                  ).map((order: any) => (
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
                {orders.length === 0 && !filter && <div>LOADING</div>}
                {orders.length === 0 && filter && <div>No Results</div>}
              </section>
            </div>
          </section>
        ))}
      {!session?.user && !frontEndDev && (
        <section className="w-screen h-screen max-w-[500px] mx-auto flex flex-col gap-8 items-center justify-center">
          <h1 className="font-bold text-3xl text-white">
            You are not Authorized!
          </h1>

          <Link
            href="/users/login"
            className="bg-white border border-black rounded-full px-6 py-3 hover:bg-black hover:text-white focus:bg-black focus:text-white"
          >
            Log In
          </Link>

          {/* {providers &&
            Object.values(providers).map((provider) => {
              // if (provider.name === "Credentials") {
              //   return (
              //     <form key={provider.name} className="flex flex-col gap-4">
              //       <label className="flex flex-col">
              //         Username
              //         <input type="text"></input>
              //       </label>
              //       <label className="flex flex-col">
              //         Password
              //         <input type="password"></input>
              //       </label>
              //       <button className="border border-black rounded-full px-6 py-3 hover:bg-black hover:text-white focus:bg-black focus:text-white">
              //         Login
              //       </button>
              //     </form>
              //   );
              // }

              return (
                <button
                  type="button"
                  key={provider.name}
                  onClick={() => signIn(provider.id)}
                  className="border border-black rounded-full px-6 py-3 hover:bg-black hover:text-white focus:bg-black focus:text-white"
                >
                  Login with {provider.name}
                </button>
              );
            })} */}
        </section>
      )}
    </>
  );
};

export default Home;
