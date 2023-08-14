import { NextResponse } from 'next/server'
import { getToken } from 'next-auth/jwt'

export async function middleware(req) {
    const session = await getToken({ req, secret: process.env.NEXTAUTH_SECRET })
    console.log({ session })

    if (!session) {
        const requestedPage = req.nextUrl.pathname
        const url = req.nextUrl.clone()
        url.pathname = `/login`
        url.search = `p=${requestedPage}`

        return NextResponse.redirect(url)
    }
    return NextResponse.next()
}

export const config = {
    matcher: ['/movimientos', '/equipos', '/insumos', '/laboratorios', '/parametros', '/reservas/internas', '/reservas/externas'],
}