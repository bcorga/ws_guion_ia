import NextAuth from "next-auth";
import GoogleProvider from "next-auth/providers/google";
//import FacebookProvider from "next-auth/providers/facebook";

export default NextAuth({
  providers: [
    // Proveedor Google
    GoogleProvider({
      clientId: process.env.GOOGLE_CLIENT_ID,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET,
    }),
    // Proveedor Facebook
   /* FacebookProvider({
      clientId: process.env.FACEBOOK_CLIENT_ID,
      clientSecret: process.env.FACEBOOK_CLIENT_SECRET,
    }),*/
  ],
  pages: {
    signIn: "/login", // Página de login personalizada
    error: "/auth/error", // Página de error personalizada
  },
  callbacks: {
    async jwt(token, user) {
      // Se ejecuta cada vez que NextAuth crea un JWT
      if (user) {
        token.id = user.id;
        token.email = user.email;
      }
      return token;
    },
    async session(session, token) {
      // Se ejecuta cada vez que se crea una sesión
      session.user.id = token.id;
      session.user.email = token.email;
      return session;
    },
  },
  secret: process.env.NEXTAUTH_SECRET,
  debug: true, // Habilitar depuración
});
