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
                // const USER = process.env.AUTH_USER
                // const PASSW = process.env.AUTH_PASSW
                const USER = 'admin'
                const PASSW = '65pT8HE9T4kQ'

                const response = await fetch('https://api.pucesi.edu.ec/Web-Services/api/auth/data', {
                    method: "POST",
                    headers: {
                        'Content-Type': 'application/json',
                        'Authorization': 'Basic ' + encode(USER + ':' + PASSW)
                    },
                    body: JSON.stringify({
                        usuario: credentials.username,
                        password: credentials.password
                    })
                })
                const result = await response.json()
                console.log(result)
                if (result.error) {
                    throw new Error(result.message)
                }
                else {
                    await fetch('https://tecnologia-enfermeria.vercel.app/api/usuarioAutorizado/validacion', {
                        method: 'POST',
                        headers: { 'Content-Type': 'application/json' },
                        body: JSON.stringify({ cedula: result.cedula })
                    })
                        .then(res => res.json())
                        .then(json => {
                            console.log(json.data.length)
                            if (json.data.length != 1) {
                                throw new Error('Usuario no autorizado')
                            }
                        })
                }
                return result
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