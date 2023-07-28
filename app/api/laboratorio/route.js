import { NextResponse } from 'next/server';
import openDB from '@/config/db'

export async function GET(request) {
  const db = await openDB()
  if (db.estado === undefined) {
    db.connect()
    const [rows, fields] = await db.query('SELECT * FROM tbl_laboratorios WHERE LAB_ESTADO = 1')
    db.end()
    return NextResponse.json({ data: rows }, { status: 200 })

  } else {
    return NextResponse.json({ data: [] }, { status: 500 })
  }
}

export async function POST(request) {
  const db = await openDB()

  db.connect()
  const { nombre, capacidad, tipoEspacio } = await request.json()
  const [result, fields] = await db.query('INSERT INTO tbl_laboratorios (LAB_NOMBRE, LAB_CAPACIDAD, LAB_TIPO) VALUES (?, ?, ?)', [nombre, capacidad, tipoEspacio]);
  db.end()
  if (result.affectedRows > 0) {
    return NextResponse.json({ msg: "Laboratorio registrado", estado: true }, { status: 201 })
  } else {
    return NextResponse.json({ msg: "Error en el registro", estado: false }, { status: 501 })
  }

}

export async function PUT(request) {
  const db = await openDB()
  db.connect()
  const { nombre, capacidad, tipoEspacio, id } = await request.json()
  const [result, fields] = await db.query('UPDATE tbl_laboratorios SET LAB_NOMBRE = ?, LAB_CAPACIDAD = ?, LAB_TIPO = ? WHERE LAB_ID = ?', [nombre, capacidad, tipoEspacio, id]);
  db.end()
  if (result.changedRows > 0) {
    return NextResponse.json({ msg: "Laboratorio editado", estado: true }, { status: 202 })
  } else {
    return NextResponse.json({ msg: "Error en la edición de registro", estado: false }, { status: 502 })
  }
}