import { NextResponse } from 'next/server';
import openDB from '@/config/db'

export async function GET(request) {
    const db = await openDB()
    if (db.estado === undefined) {
        db.connect()
        const [rows, fields] = await db.query('SELECT A.movimiento_id, B.insumo_id, B.nombre AS insumo, A.entradas, A.salidas, A.existencias FROM tbl_movimientos_insumos AS A LEFT JOIN tbl_insumos AS B ON A.insumo_id = B.insumo_id')
        db.end()
        return NextResponse.json({ data: rows }, { status: 200 })

    } else {
        return NextResponse.json({ data: [] }, { status: 500 })
    }
}
