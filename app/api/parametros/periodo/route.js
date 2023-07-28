import { NextResponse } from 'next/server';
import openDB from '@/config/db'

export async function GET(request) {
    const db = await openDB()
    if (db.estado === undefined) {
        db.connect()
        const [rows, fields] = await db.query('SELECT * FROM tbl_periodo_academico WHERE PEA_ESTADO = 1')
        db.end()
        return NextResponse.json({ data: rows }, { status: 200 })

    } else {
        return NextResponse.json({ data: [] }, { status: 500 })
    }
}

export async function POST(request) {
    const db = await openDB()
    db.connect()
    const { nombre, codigo } = await request.json()
    const [result, fields] = await db.query('INSERT INTO tbl_periodo_academico (PEA_CODIGO, PEA_NOMBRE) VALUES (?, ?)', [codigo, nombre]);
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
    const { codigo, nombre, id } = await request.json()
    const [result, fields] = await db.query('UPDATE tbl_periodo_academico SET PEA_CODIGO = ?, PEA_NOMBRE = ? WHERE PEA_ID = ?', [codigo, nombre, id]);
    db.end()
    if (result.changedRows > 0) {
        return NextResponse.json({ msg: "Periodo académico editado", estado: true }, { status: 202 })
    } else {
        return NextResponse.json({ msg: "Error en la edición de periodo académico", estado: false }, { status: 502 })
    }
}