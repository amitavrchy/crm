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
          const client = await connectMongoDB();
          const db = client.db();
          const usersCollection = db.collection("users");

          console.log("Authorizing user with email:", credentials.email); // Debugging log
          
          const user = await usersCollection.findOne({ email: credentials.email });
          if (!user) {
            console.error("No user found with email:", credentials.email); // Debugging log
            throw new Error("No user found with the given email");
          }

          const isValidPassword = await bcrypt.compare(credentials.password, user.password);
          if (!isValidPassword) {
            console.error("Invalid password for email:", credentials.email); // Debugging log
            throw new Error("Invalid email or password");
          }

          console.log("Authorization successful for email:", credentials.email); // Debugging log

          return {
            id: user._id.toString(),
            name: user.username,
            email: user.email,
            userType: user.userType, // Include userType
            user,
          };
        } catch (error) {
          console.error("Authorize error:", error.message); // Debugging log
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
    signIn: "/signIn",
  },
  callbacks: {
    async jwt({ token, user }) {
      console.log("JWT Callback - Before Update:", { token, user }); // Debugging log

      if (user) {
        token.id = user.id;
        token.email = user.email;
        token.name = user.name;
        token.userType = user.userType; // Add userType to token
      }
      token.user = user;

      console.log("JWT Callback - After Update:", { token }); // Debugging log
      return token;
    },
    async session({ session, token }) {
      console.log("Session Callback - Before Update:", { session, token }); // Debugging log

      if (token) {
        session.user.id = token.id;
        session.user.email = token.email;
        session.user.name = token.name || user.name;
        session.user.userType = token.userType; // Add userType to session
      }
      session.user = token.user;

      console.log("Session Callback - After Update:", { session }); // Debugging log
      return session;
    },
  },
  jwt: {
    secret: process.env.NEXTAUTH_SECRET, // Ensure this is set
    encryption: true, // Enable encryption for added security
  },
  debug: process.env.NODE_ENV === "development",
};

export default NextAuth(options);
