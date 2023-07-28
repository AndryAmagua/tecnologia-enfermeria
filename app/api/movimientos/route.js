import { NextResponse } from 'next/server';
import openDB from '@/config/db'

export async function GET(request) {
    const db = await openDB()
    if (db.estado === undefined) {
        db.connect()
        const [rows, fields] = await db.query('SELECT tbl_movimientos_insumos.MOI_ID, tbl_insumos.INS_ID, tbl_insumos.INS_NOMBRE, tbl_movimientos_insumos.MOI_ENTRADAS_TOTALES, tbl_movimientos_insumos.MOI_SALIDAS_TOTALES, tbl_movimientos_insumos.MOI_EXISTENCIAS FROM tbl_movimientos_insumos INNER JOIN tbl_insumos ON tbl_movimientos_insumos.INS_ID = tbl_insumos.INS_ID')
        db.end()
        return NextResponse.json({ data: rows }, { status: 200 })

    } else {
        return NextResponse.json({ data: [] }, { status: 500 })
    }
}
