// pages/protected.tsx
import { getSession } from "next-auth/react";

const ProtectedPage = async () => {
  // const data = await getData();
  return <div>This is a protected page</div>;
};

async function getData(context: any) {
  const session = await getSession(context);

  if (!session) {
    return {
      redirect: {
        destination: "/users/login",
        permanent: false,
      },
    };
  }

  return {
    props: { session },
  };
}

export default ProtectedPage;
