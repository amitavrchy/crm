import NextAuth from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";
import { connectMongoDB } from "../../../lib/mongodb";
import { MongoClient } from "mongodb";
import bcrypt from "bcrypt";

const options = {
  providers: [
    CredentialsProvider({
      name: "Credentials",
      credentials: {
        email: { label: "Email", type: "text", placeholder: "Email" },
        password: { label: "Password", type: "password" },
      },
      async authorize(credentials) {
        const client = await connectMongoDB();
        const usersCollection = client.db().collection("users");

        // Check if the user exists
        const user = await usersCollection.findOne({ email: credentials.email });
        if (!user) {
          throw new Error("No user found with the given email");
        }

        // Compare hashed password
        const isValidPassword = await bcrypt.compare(credentials.password, user.password);
        if (!isValidPassword) {
          throw new Error("Invalid password");
        }

        // Return the user object (only required fields)
        return { id: user._id, name: user.username, email: user.email };
      },
    }),
  ],
  secret: process.env.NEXTAUTH_SECRET,
  session: {
    jwt: true,
  },
  pages: {
    signIn: "/signIn", // Your custom sign-in page
  },
  callbacks: {
    async session({ session, token }) {
      session.user.id = token.sub;
      return session;
    },
  },
};

export default NextAuth(options);
