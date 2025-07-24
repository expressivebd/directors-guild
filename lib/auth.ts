import NextAuth from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";
import bcrypt from "bcryptjs";
import connectDB from "@/lib/mongodb";
import User from "@/lib/models/User";

export const {
  handlers: { GET, POST },
  auth,
  signIn,
  signOut,
} = NextAuth({
  providers: [
    CredentialsProvider({
      name: "credentials",
      credentials: {
        email: { label: "Email", type: "email" },
        password: { label: "Password", type: "password" },
      },
      async authorize(credentials) {
        if (!credentials?.email || !credentials?.password) {
          return null;
        }

        try {
          await connectDB();

          const user = await User.findOne({
            email: credentials.email.toLowerCase(),
          }).select("+password");

          if (!user) {
            return null;
          }

          const isPasswordValid = await bcrypt.compare(
            credentials.password as string,
            user.password
          );

          if (!isPasswordValid) {
            return null;
          }

          // Only allow login for approved members (not pending)
          if (user.memberType === "pending") {
            return null;
          }

          return {
            id: user._id.toString(),
            name: user.name,
            email: user.email,
            memberType: user.memberType,
            adminRoles: user.adminRoles,
          };
        } catch (error) {
          console.error("Auth error:", error);
          return null;
        }
      },
    }),
  ],
  callbacks: {
    async jwt({ token, user }) {
      if (user) {
        token.memberType = user.memberType;
        // Convert adminRoles array to comma-separated string for JWT compatibility
        const adminRolesString = Array.isArray(user.adminRoles)
          ? user.adminRoles.join(",")
          : "";
        token.adminRoles = adminRolesString;
      }
      return token;
    },
    async session({ session, token }) {
      if (token && token.sub) {
        session.user.id = token.sub;
        session.user.memberType = token.memberType;
        // Convert adminRoles back to array for session
        session.user.adminRoles = token.adminRoles
          ? token.adminRoles
              .split(",")
              .filter((role: string) => role.length > 0)
          : [];
      }
      return session;
    },
  },
  pages: {
    signIn: "/auth/signin",
  },
  session: {
    strategy: "jwt",
  },
  secret: process.env.NEXTAUTH_SECRET,
});
