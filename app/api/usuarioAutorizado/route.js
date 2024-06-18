import { NextResponse } from 'next/server';
import openDB from '@/config/db'

export async function GET(request) {
    const db = await openDB()
    if (db.estado === undefined) {
        db.connect()
        const [rows, fields] = await db.query('SELECT * FROM tbl_usuario_autorizado WHERE estado = 1')
        db.end()
        return NextResponse.json({ data: rows }, { status: 200 })

    } else {
        return NextResponse.json({ data: [] }, { status: 500 })
    }
}

export async function POST(request) {
    const db = await openDB()

    db.connect()
    const { nombres, cedula } = await request.json()
    const [result, fields] = await db.query('INSERT INTO tbl_usuario_autorizado (nombres, cedula) VALUES (?, ?)', [nombres, cedula]);
    db.end()
    if (result.affectedRows > 0) {
        return NextResponse.json({ msg: "Usuario registrado", estado: true }, { status: 201 })
    } else {
        return NextResponse.json({ msg: "Error en el registro", estado: false }, { status: 501 })
    }

}

export async function PUT(request) {
    const db = await openDB()
    db.connect()
    const { nombres, cedula, usuario_id } = await request.json()
    const [result, fields] = await db.query('UPDATE tbl_usuario_autorizado SET nombres = ?, cedula  = ? WHERE usuario_id = ?', [nombres, cedula, usuario_id]);
    db.end()
    if (result.changedRows > 0) {
        return NextResponse.json({ msg: "Usuario editado", estado: true }, { status: 202 })
    } else {
        return NextResponse.json({ msg: "Error en la edición de registro", estado: false }, { status: 502 })
    }
}