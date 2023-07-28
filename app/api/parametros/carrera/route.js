import { NextResponse } from 'next/server';
import openDB from '@/config/db'

export async function GET(request) {
    const db = await openDB()
    if (db.estado === undefined) {
        db.connect()
        const [rows, fields] = await db.query('SELECT * FROM tbl_carrera WHERE CAR_ESTADO = 1')
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
    const [result, fields] = await db.query('INSERT INTO tbl_carrera (CAR_NOMBRE) VALUES (?)', [nombre]);
    db.end()
    if (result.affectedRows > 0) {
        return NextResponse.json({ msg: "Carrera registrada", estado: true }, { status: 201 })
    } else {
        return NextResponse.json({ msg: "Error en el registro de carrera", estado: false }, { status: 501 })
    }
}

export async function PUT(request) {
    const db = await openDB()
    db.connect()
    const { nombre, id } = await request.json()
    const [result, fields] = await db.query('UPDATE tbl_carrera SET CAR_NOMBRE = ? WHERE CAR_ID = ?', [nombre, id]);
    db.end()
    if (result.changedRows > 0) {
        return NextResponse.json({ msg: "Carrera editada", estado: true }, { status: 202 })
    } else {
        return NextResponse.json({ msg: "Error en la edición de carrera", estado: false }, { status: 502 })
    }
}