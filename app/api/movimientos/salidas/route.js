import { NextResponse } from 'next/server';
import openDB from '@/config/db'

export async function GET(request) {
    const db = await openDB()
    if (db.estado === undefined) {
        db.connect()
        const [rows, fields] = await db.query('SELECT * FROM tbl_salidas')
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
    const [result, fields] = await db.query('UPDATE tbl_movimientos_insumos SET salidas = CASE WHEN existencias >= ? THEN salidas + ? ELSE salidas END, existencias = CASE WHEN existencias >= ? THEN existencias - ? ELSE existencias END WHERE insumo_id = ?', [cantidad, cantidad, cantidad, cantidad, insumo_id])
    if (result.changedRows > 0) {
        const [rows, fields] = await db.query('INSERT INTO tbl_salidas (insumo_id, fecha, cantidad) VALUES (?, ?, ?)', [insumo_id, fecha, cantidad])
        db.end()
        if (rows.affectedRows > 0) {
            return NextResponse.json({ msg: "Salida registrada", estado: true }, { status: 201 })
        } else {
            return NextResponse.json({ msg: "Error en el registro de salida", estado: false }, { status: 501 })
        }
    } else {
        db.end()
        return NextResponse.json({ msg: "La cantidad de salida no puede ser superior a las existencias", estado: false }, { status: 202 })
    }

}