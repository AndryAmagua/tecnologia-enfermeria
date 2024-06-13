import { NextResponse } from 'next/server';
import openDB from '@/config/db'

export async function GET(request) {
    const db = await openDB()
    if (db.estado === undefined) {
        db.connect()
        const [rows, fields] = await db.query('SELECT A.periodo_id, A.codigo, A.nombre, A.carrera_id, B.nombre AS carrera FROM tbl_periodo_academico AS A INNER JOIN tbl_carrera AS B ON A.carrera_id = B.carrera_id WHERE A.estado = 1')
        db.end()
        return NextResponse.json({ data: rows }, { status: 200 })

    } else {
        return NextResponse.json({ data: [] }, { status: 500 })
    }
}

export async function POST(request) {
    const db = await openDB()
    db.connect()
    const { carrera_id, codigo, nombre } = await request.json()
    const [result, fields] = await db.query('INSERT INTO tbl_periodo_academico (carrera_id, codigo, nombre) VALUES (?, ?, ?)', [carrera_id, codigo, nombre]);
    db.end()
    if (result.affectedRows > 0) {
        return NextResponse.json({ msg: "Periodo académico registrado", estado: true }, { status: 201 })
    } else {
        return NextResponse.json({ msg: "Error en el registro de periodo académico", estado: false }, { status: 501 })
    }
}

export async function PUT(request) {
    const db = await openDB()
    db.connect()
    const { carrera_id, codigo, nombre, periodo_id } = await request.json()
    const [result, fields] = await db.query('UPDATE tbl_periodo_academico SET carrera_id = ?, codigo = ?, nombre = ? WHERE periodo_id = ?', [carrera_id, codigo, nombre, periodo_id]);
    db.end()
    if (result.changedRows > 0) {
        return NextResponse.json({ msg: "Periodo académico editado", estado: true }, { status: 202 })
    } else {
        return NextResponse.json({ msg: "Error en la edición de periodo académico", estado: false }, { status: 502 })
    }
}