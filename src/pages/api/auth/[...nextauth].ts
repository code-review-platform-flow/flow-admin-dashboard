import { IUserCredentials, IUserLoginResponse, loginUser } from "@/client/user/user";
import NextAuth from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";

const credentialsProviderOption = CredentialsProvider({
  id: "login-credentials",
  name: "login-credentials",
  credentials: {
    email: { label: "Email", type: "email" },
    password: { label: "Password", type: "password" },
  },
  async authorize(credentials) {
    if (!credentials) {
      return null;
    }

    const loginCredentials: IUserCredentials = {
      email: credentials.email,
      password: credentials.password,
    };

    try {
      const response = await loginUser(loginCredentials);
      if (!response.ok) {
        console.error(`Failed to log in: ${response.status} ${response.statusText}`);
        return null;
      }

      const parsedResponse = (await response.json()) as IUserLoginResponse;

      const { email, accessToken, refreshToken, role } = parsedResponse;

      if (role !== "ROLE_ADMIN") {
        return null;
      }

      if (email && accessToken) {
        return {
          id: email,
          email,
          accessToken,
          refreshToken,
        };
      }

      return null;
    } catch (error) {
      console.error("Login error:", error);
      return null;
    }
  },
});

export default NextAuth({
  pages: {
    signIn: "/login",
    verifyRequest: "/login?verify=1",
    error: "/login",
  },
  providers: [credentialsProviderOption],
  callbacks: {
    jwt({ token, user }) {
      if (user) {
        token.id = user.id;
        token.email = user.email;
        token.accessToken = user.accessToken;
        token.refreshToken = user.refreshToken;
      }
      return token;
    },
    session({ session, token }) {
      session.user = {
        ...session.user,
        id: token.id as string,
        email: token.email as string,
      };
      session.accessToken = token.accessToken as string;
      session.refreshToken = token.refreshToken as string;
      return session;
    },
  },
  secret: process.env.NEXTAUTH_SECRET,
});
