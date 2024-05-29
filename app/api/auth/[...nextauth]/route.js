import User from "@/models/user.model";
import { connectToDB } from "@/utils/database";
import * as bcrypt from "bcrypt";
import NextAuth from "next-auth/next";
import CredentialsProvider from "next-auth/providers/credentials";

const logIn = async (credentials) => {
  try {
    await connectToDB();
    const exists = await User.findOne({
      username: credentials?.username,
    });

    if (!exists) {
      throw new Error("Wrong Credentials");
    }

    const pass = credentials?.password ? credentials?.password : "";

    if (!(await bcrypt.compare(pass, exists.password))) {
      throw new Error("Wrong Credentials");
    }

    const { password, ...userWithoutPassword } = exists;

    if (userWithoutPassword) {
      return userWithoutPassword;
    } else {
      return null;
    }
  } catch (error) {
    console.log(error);
    throw new Error("Something went wrong while logging in.");
  }
};

const handler = NextAuth({
  providers: [
    CredentialsProvider({
      name: "Credentials",
      credentials: {
        username: { label: "Username", type: "text" },
        password: { label: "Password", type: "password" },
      },
      async authorize(credentials) {
        // console.log("Authorize called with:", credentials);
        try {
          const user = await logIn(credentials);
          console.log(user);
          return user;
        } catch (error) {
          console.error(error);
          throw new Error("Failed to log in!");
        }
      },
    }),
  ],
  pages: {
    signIn: "/users/login", // Custom sign in page
  },
  callbacks: {
    async session({ session, token }) {
      // const sessionUser = await User.findOne({
      //   email: session.user.email,
      // });
      if (token) {
        session.user.id = token.id;
        session.user.email = token.email;
        session.user.username = token.username;
      }
      return session;
    },
    async jwt({ token, user }) {
      if (user) {
        token.username = user.username;
        token.email = user.email;
        token.id = user.id;
      }
      return token;
    },
  },
  secret: process.env.NEXTAUTH_SECRET,
  debug: process.env.NODE_ENV === "development",
  session: {
    // Set to jwt in order to CredentialsProvider works properly
    strategy: "jwt",
  },
});

export { handler as GET, handler as POST };
