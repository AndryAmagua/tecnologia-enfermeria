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
    const { insumoID, fecha, cantidad } = await request.json()
    const [result, fields] = await db.query('UPDATE tbl_movimientos_insumos SET MOI_SALIDAS_TOTALES = CASE WHEN MOI_EXISTENCIAS >= ? THEN MOI_SALIDAS_TOTALES + ? ELSE MOI_SALIDAS_TOTALES END, MOI_EXISTENCIAS = CASE WHEN MOI_EXISTENCIAS >= ? THEN MOI_EXISTENCIAS - ? ELSE MOI_EXISTENCIAS END WHERE INS_ID = ?', [cantidad, cantidad, cantidad, cantidad, insumoID])
    if (result.changedRows > 0) {
        const [rows, fields] = await db.query('INSERT INTO tbl_salidas (INS_ID, SAL_FECHA, SAL_CANTIDAD) VALUES (?, ?, ?)', [insumoID, fecha, cantidad])
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