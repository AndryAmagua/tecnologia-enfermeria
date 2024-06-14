import { NextResponse } from 'next/server';
import openDB from '@/config/db'

export async function GET(request) {
    const db = await openDB()
    if (db.estado === undefined) {
        db.connect()
        const [rows, fields] = await db.query('SELECT * FROM tbl_estado_solicitud')
        db.end()
        return NextResponse.json({ data: rows }, { status: 200 })

    } else {
        return NextResponse.json({ data: [] }, { status: 500 })
    }
}

export async function POST(request) {
    const db = await openDB()
    db.connect()
    const { nombre } = await request.json()
    const [result, fields] = await db.query('INSERT INTO tbl_estado_solicitud (nombre) VALUES (?)', [nombre])
    db.end()
    if (result.affectedRows > 0) {
        return NextResponse.json({ msg: "Estado registrada", estado: true }, { status: 201 })
    } else {
        return NextResponse.json({ msg: "Error en el registro de estado", estado: false }, { status: 501 })
    }
}

export async function PUT(request) {
    const db = await openDB()
    db.connect()
    const { nombre, estado_id } = await request.json()
    const [result, fields] = await db.query('UPDATE tbl_estado_solicitud SET nombre = ? WHERE estado_id = ?', [nombre, estado_id]);
    db.end()
    if (result.changedRows > 0) {
        return NextResponse.json({ msg: "Estado editada", estado: true }, { status: 202 })
    } else {
        return NextResponse.json({ msg: "Error en la edición de estado", estado: false }, { status: 502 })
    }
}