import { NextResponse } from 'next/server';
import openDB from '@/config/db'

export async function GET(request, { params }) {
    const db = await openDB()
    if (db.estado === undefined) {
        db.connect()
        const id = await params.id
        const [rows, fields] = await db.query('SELECT * FROM tbl_carrera WHERE carrera_id = ?', [id]);
        db.end()
        return NextResponse.json({ data: rows }, { status: 200 })

    } else {
        return NextResponse.json({ data: [] }, { status: 500 })
    }
}

export async function DELETE(request, { params }) {
    const db = await openDB()
    db.connect()
    const id = await params.id
    const [result, fields] = await db.query('UPDATE tbl_carrera SET estado = 0 WHERE carrera_id = ?', [id]);
    db.end()
    if (result.changedRows > 0) {
        return NextResponse.json({ msg: "Carrera eliminada", estado: true }, { status: 203 })
    } else {
        return NextResponse.json({ msg: "Error en la eliminación de carrera", estado: false }, { status: 503 })
    }
}