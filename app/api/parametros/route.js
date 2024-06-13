import { NextResponse } from 'next/server';
import openDB from '@/config/db'

export async function GET(request) {
    const db = await openDB()
    if (db.estado === undefined) {
        db.connect()
        const [rows] = await db.query('SELECT * FROM tbl_carrera WHERE estado = 1')
        const [rows2] = await db.query('SELECT * FROM tbl_periodo_academico WHERE estado = 1')
        const [rows3] = await db.query('SELECT * FROM tbl_asignatura WHERE estado = 1')
        db.end()
        return NextResponse.json({ data: [rows, rows2, rows3] }, { status: 200 })

    } else {
        return NextResponse.json({ data: [] }, { status: 500 })
    }
}