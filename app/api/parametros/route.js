import { NextResponse } from 'next/server';
import openDB from '@/config/db'

export async function POST(request) {
    const db = await openDB()
    if (db.estado === undefined) {
        const { carrera_id } = await request.json()

        db.connect()
        const [rows] = await db.query('SELECT * FROM tbl_periodo_academico WHERE carrera_id = ? AND estado = 1', [carrera_id])
        const [rows2] = await db.query('SELECT * FROM tbl_asignatura WHERE carrera_id = ? AND estado = 1', [carrera_id])
        const [rows3] = await db.query('SELECT * FROM tbl_ejecucion_practica WHERE carrera_id = ? AND estado = 1', [carrera_id])

        db.end()
        return NextResponse.json({ data: [rows, rows2, rows3] }, { status: 200 })

    } else {
        return NextResponse.json({ data: [] }, { status: 500 })
    }
}