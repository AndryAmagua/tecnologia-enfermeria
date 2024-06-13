import { NextResponse } from 'next/server';
import openDB from '@/config/db'

export async function GET(request) {
    const db = await openDB()
    if (db.estado === undefined) {
        db.connect()
        const [rows, fields] = await db.query('SELECT * FROM tbl_entradas')
        db.end()
        return NextResponse.json({ data: rows }, { status: 200 })

    } else {
        return NextResponse.json({ data: [] }, { status: 500 })
    }
}

export async function POST(request) {
    const db = await openDB()

    db.connect()
    const { insumo_id, fecha, cantidad } = await request.json()
    const [result, fields] = await db.query('INSERT INTO tbl_entradas (insumo_id, fecha, cantidad) VALUES (?, ?, ?)', [insumo_id, fecha, cantidad])
    await db.query('UPDATE tbl_movimientos_insumos SET entradas = entradas + ?, existencias = existencias + ? WHERE insumo_id = ?', [cantidad, cantidad, insumo_id])
    db.end()
    if (result.affectedRows > 0) {
        return NextResponse.json({ msg: "Entrada registrada", estado: true }, { status: 201 })
    } else {
        return NextResponse.json({ msg: "Error en el registro de entrada", estado: false }, { status: 501 })
    }
}