import NextAuth from "next-auth"
import CredentialsProvider from "next-auth/providers/credentials";

const handler = NextAuth({
    providers: [
        CredentialsProvider({
          name: "Credentials",

          credentials: {
            username: { label: "Username", type: "text", placeholder: "jsmith" },
            password: { label: "Password", type: "password" }
          },
          async authorize(credentials, req) {
              const username = credentials?.username
              const password = credentials?.password
              const user = { id: "1", name: "J Smith", email: "jsmith@example.com" }
              if (user) {
              return user
            } else {
              return null
            }
          }
        })
      ]
      
})

export { handler as GET, handler as POST }