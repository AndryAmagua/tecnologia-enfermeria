import { NextResponse } from 'next/server';
import openDB from '@/config/db'

export async function POST(request) {
    const db = await openDB()
    if (db.estado === undefined) {
        const { cedula } = await request.json()
        db.connect()
        const [rows, fields] = await db.query('SELECT * FROM tbl_usuario_autorizado WHERE cedula = ?', [cedula])
        db.end()
        return NextResponse.json({ data: rows }, { status: 200 })

    } else {
        return NextResponse.json({ data: [] }, { status: 500 })
    }
}