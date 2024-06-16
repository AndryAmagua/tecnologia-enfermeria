import { NextResponse } from 'next/server';
import openDB from '@/config/db'

export async function GET(request) {
    const db = await openDB()
    if (db.estado === undefined) {
        db.connect()
        const [rows, fields] = await db.query('SELECT * FROM tbl_personal_externo ')
        db.end()
        return NextResponse.json({ data: rows }, { status: 200 })

    } else {
        return NextResponse.json({ data: [] }, { status: 500 })
    }
}

export async function POST(request) {
    const db = await openDB()
    db.connect()
    const { nombre_completo, cedula, correo, institucion } = await request.json()
    const [result, fields] = await db.query('SELECT * FROM tbl_personal_externo WHERE correo = LOWER(?) OR cedula = LOWER(?)', [correo, cedula])
    if (result.length == 0) {
        await db.query('INSERT INTO tbl_personal_externo ( nombre_completo, cedula, correo, institucion) VALUES (LOWER(?), LOWER(?), LOWER(?), LOWER(?))', [nombre_completo, cedula, correo, institucion])
        db.end()
        return NextResponse.json({ msg: "Usuario registrado", estado: true }, { status: 201 })
    } else {
        db.end()
        return NextResponse.json({ msg: "Usuario existente con el mismo correo o cédula", estado: false }, { status: 501 })
    }
}