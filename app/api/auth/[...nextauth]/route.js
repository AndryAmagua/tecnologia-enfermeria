import NextAuth from "next-auth"
import CredentialsProvider from "next-auth/providers/credentials"
import { encode } from "base-64"

const handler = NextAuth({
    providers: [
        CredentialsProvider({
            name: 'Credentials',
            credentials: {
                username: { label: "Username", type: "text", placeholder: "username" },
                password: { label: "Password", type: "password" }
            },
            async authorize(credentials, req) {
                const USER = process.env.AUTH_USER
                const PASSW = process.env.AUTH_PASSW

                const response = await fetch('https://api.pucesi.edu.ec/Web-Services/api/auth/user', {
                    method: "POST",
                    headers: {
                        'Content-Type': 'application/json',
                        'Authorization': 'Basic ' + encode(USER + ':' + PASSW)
                    },
                    body: JSON.stringify({
                        user: credentials.username,
                        pass: credentials.password
                    })
                })
                const result = await response.json()
                if (result.value == false) {
                    throw new Error(result.msg)
                }
                return result.data
            }
        })
    ],
    callbacks: {
        async jwt({ token, user }) {
            if (user) token.user = user
            return token
        },
        async session({ session, token }) {
            session.user = token.user
            return session
        },
    }
})

export { handler as GET, handler as POST }