import NextAuth from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";
import { connectMongoDB } from "../../../lib/mongodb";
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
        try {
          // Connect to MongoDB
          const client = await connectMongoDB();
          const db = client.db();
          const usersCollection = db.collection("users");

          // Find the user by email
          const user = await usersCollection.findOne({ email: credentials.email });
          if (!user) {
            throw new Error("No user found with the given email");
          }

          // Validate the password
          const isValidPassword = await bcrypt.compare(credentials.password, user.password);
          if (!isValidPassword) {
            throw new Error("Invalid email or password");
          }

          // Return user object (fields used in the session and token)
          return { id: user._id.toString(), name: user.username, email: user.email };
        } catch (error) {
          console.error("Authorize error:", error.message);
          throw new Error("Unable to authenticate. Please try again.");
        }
      },
    }),
  ],
  secret: process.env.NEXTAUTH_SECRET,
  session: {
    strategy: "jwt",
  },
  pages: {
    signIn: "/signIn", // Custom sign-in page route
  },
  callbacks: {
    async jwt({ token, user }) {
      // Include user information in the JWT token
      if (user) {
        token.id = user.id;
        token.email = user.email;
        token.name = user.name;
      }
      return token;
    },
    async session({ session, token }) {
      // Include user ID in the session
      if (token) {
        session.user.id = token.id;
        session.user.email = token.email;
        session.user.name = token.name;
      }
      return session;
    },
  },
  debug: process.env.NODE_ENV === "development", // Enable debug logs in development
};

export default NextAuth(options);
