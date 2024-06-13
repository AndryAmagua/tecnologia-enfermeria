import { NextResponse } from 'next/server';
import openDB from '@/config/db'

export async function GET(request, { params }) {
    const db = await openDB()
    if (db.estado === undefined) {
        db.connect()
        const id = await params.id
        const [entradas, fields] = await db.query('SELECT entrada_id, fecha, cantidad FROM tbl_entradas WHERE insumo_id = ?', [id])
        const [salidas, fields2] = await db.query('SELECT salida_id, fecha, cantidad FROM tbl_salidas WHERE insumo_id = ?', [id])
        db.end()
        return NextResponse.json({ data: { entradas, salidas } }, { status: 200 })

    } else {
        return NextResponse.json({ data: [] }, { status: 500 })
    }
}