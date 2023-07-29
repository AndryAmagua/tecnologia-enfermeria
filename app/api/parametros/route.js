import { NextResponse } from 'next/server';
import openDB from '@/config/db'

export async function GET(request) {
    const db = await openDB()
    if (db.estado === undefined) {
        db.connect()
        const [rows] = await db.query('SELECT * FROM tbl_carrera WHERE CAR_ESTADO = 1')
        const [rows2] = await db.query('SELECT * FROM tbl_nivel WHERE NIV_ESTADO = 1')
        const [rows3] = await db.query('SELECT * FROM tbl_paralelo WHERE PAR_ESTADO = 1')
        const [rows4] = await db.query('SELECT * FROM tbl_periodo_academico WHERE PEA_ESTADO = 1')
        const [rows5] = await db.query('SELECT * FROM tbl_motivo WHERE MOT_ESTADO = 1')
        const [rows6] = await db.query('SELECT * FROM tbl_catedra WHERE CAT_ESTADO = 1')
        db.end()
        return NextResponse.json({ data: [rows, rows2, rows3, rows4, rows5, rows6] }, { status: 200 })

    } else {
        return NextResponse.json({ data: [] }, { status: 500 })
    }
}