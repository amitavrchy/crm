import NextAuth from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";
import { connectMongoDB } from "../../../lib/mongodb";
import bcrypt from "bcrypt";

export default NextAuth({
  providers: [
    CredentialsProvider({
      name: "Credentials",
      credentials: {
        email: { label: "Email", type: "text", placeholder: "Email" },
        password: { label: "Password", type: "password" },
      },
      async authorize(credentials) {
        try {
          const db = await connectMongoDB();
          const usersCollection = db.collection("users");

          const user = await usersCollection.findOne({ email: credentials.email });
          if (!user) throw new Error("Invalid email or password");

          const isValidPassword = await bcrypt.compare(credentials.password, user.password);
          if (!isValidPassword) throw new Error("Invalid email or password");

          return { id: user._id.toString(), name: user.username, email: user.email, userType: user.userType };
        } catch (error) {
          console.error("Authentication Error:", error);
          throw new Error("Unable to authenticate");
        }
      },
    }),
  ],
  secret: process.env.NEXTAUTH_SECRET,
  session: { strategy: "jwt" },
  pages: { signIn: "/signIn" },
  callbacks: {
    async jwt({ token, user }) {
      if (user) {
        token.id = user.id;
        token.email = user.email;
        token.name = user.name;
        token.userType = user.userType;
      }
      return token;
    },
    async session({ session, token }) {
      if (token) {
        session.user.id = token.id;
        session.user.email = token.email;
        session.user.name = token.name;
        session.user.userType = token.userType;
      }
      return session;
    },
  },
  debug: process.env.NODE_ENV === "development",
});
