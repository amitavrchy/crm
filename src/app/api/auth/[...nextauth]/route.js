import NextAuth from "next-auth/next";
import CredentialsProvider from "next-auth/providers/credentials";
import { connectMongoDB } from "@/lib/mongodb";
import bcrypt from "bcrypt";

const handler = NextAuth({
    providers: [
        CredentialsProvider({
            name: "Credentials",
            credentials: {
                email: {},
                password: {},
            },
            async authorize(credentials) {
                const { db } = await connectMongoDB();
            
                const user = await db.collection("users").findOne({ email: credentials.email });
                if (!user) throw new Error("Invalid email or password");
            
                const isValid = await bcrypt.compare(credentials.password, user.password);
                if (!isValid) throw new Error("Invalid email or password");
            
                return { id: user._id.toString(), email: user.email, userType: user.userType };
            },
        }),
    ],
    callbacks: {
        async session({ session, token }) {
            if (token) {
                session.user.id = token.id;
                session.user.userType = token.userType;
            }
            return session;
        },
        async jwt({ token, user }) {
            if (user) {
                token.id = user.id;
                token.userType = user.userType;
            }
            return token;
        },
    },
    pages: {
        signIn: "/signIn",
    },
    session: {
        strategy: "jwt",
        maxAge: 30*24*60*60
    },
    secret: process.env.NEXTAUTH_SECRET,
});
export { handler as GET, handler as POST };
