import { NextResponse } from 'next/server';
import openDB from '@/config/db'

export async function GET(request) {
    const db = await openDB()
    if (db.estado === undefined) {
        db.connect()
        const [rows, fields] = await db.query('SELECT A.ejecucion_id, A.nombre, A.carrera_id, B.nombre AS carrera FROM tbl_ejecucion_practica AS A INNER JOIN tbl_carrera AS B ON A.carrera_id = B.carrera_id WHERE A.estado = 1')
        db.end()
        return NextResponse.json({ data: rows }, { status: 200 })

    } else {
        return NextResponse.json({ data: [] }, { status: 500 })
    }
}

export async function POST(request) {
    const db = await openDB()
    db.connect()
    const { carrera_id, nombre } = await request.json()
    const [result, fields] = await db.query('INSERT INTO tbl_ejecucion_practica (carrera_id, nombre) VALUES (?, ?)', [carrera_id, nombre]);
    db.end()
    if (result.affectedRows > 0) {
        return NextResponse.json({ msg: "Etapa de práctica registrada", estado: true }, { status: 201 })
    } else {
        return NextResponse.json({ msg: "Error en el registro de etapa de práctica", estado: false }, { status: 501 })
    }
}

export async function PUT(request) {
    const db = await openDB()
    db.connect()
    const { carrera_id, nombre, ejecucion_id } = await request.json()
    const [result, fields] = await db.query('UPDATE tbl_ejecucion_practica SET carrera_id = ?, nombre = ? WHERE ejecucion_id = ?', [carrera_id, nombre, ejecucion_id]);
    db.end()
    if (result.changedRows > 0) {
        return NextResponse.json({ msg: "Etapa de práctica editada", estado: true }, { status: 202 })
    } else {
        return NextResponse.json({ msg: "Error en la edición de etapa de práctica", estado: false }, { status: 502 })
    }
}