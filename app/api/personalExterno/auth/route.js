import { NextResponse } from 'next/server';
import openDB from '@/config/db'

export async function POST(request) {
    const db = await openDB()
    db.connect()
    const { cedula, correo } = await request.json()
    const [result, fields] = await db.query('SELECT * FROM tbl_personal_externo WHERE PER_CORREO = LOWER(?) AND PER_CEDULA = LOWER(?)', [correo, cedula])
    db.end()
    if (result.length == 0) {
        return NextResponse.json({ msg: "Usuario no registrado con ese correo o cédula", estado: false }, { status: 201 })
    } else {
        return NextResponse.json({ data: result, estado: true }, { status: 202 })
    }
}