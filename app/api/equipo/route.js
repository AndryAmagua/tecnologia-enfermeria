import { NextResponse } from 'next/server';
import openDB from '@/config/db'

export async function GET(request) {
    const db = await openDB()
    if (db.estado === undefined) {
        db.connect()
        const [rows, fields] = await db.query('SELECT A.equipo_id ,A.codigo_sap, A.nombre, A.cantidad_piezas, A.especificaciones, A.marca, C.categoria_id, C.nombre AS categoria, B.area_id, B.nombre AS area, A.disponibilidad FROM ((tbl_equipos_biomedicos AS A INNER JOIN tbl_area_reserva AS B ON A.area_id = B.area_id)INNER JOIN tbl_categoria_equipo AS C ON A.categoria_id = C.categoria_id) WHERE A.estado = 1')
        db.end()
        return NextResponse.json({ data: rows }, { status: 200 })

    } else {
        return NextResponse.json({ data: [] }, { status: 500 })
    }
}

export async function POST(request) {
    const db = await openDB()
    db.connect()
    const { codigo_sap, nombre, cantidad_piezas, especificaciones, marca, categoria_id, area_id } = await request.json()
    const [result, fields] = await db.query('INSERT INTO tbl_equipos_biomedicos (codigo_sap, nombre, cantidad_piezas, especificaciones, marca, categoria_id, area_id) VALUES (?, ?, ?, ?, ?, ?, ?)', [codigo_sap, nombre, cantidad_piezas, especificaciones, marca, categoria_id, area_id]);
    db.end()
    if (result.affectedRows > 0) {
        return NextResponse.json({ msg: "Equipo registrado", estado: true }, { status: 201 })
    } else {
        return NextResponse.json({ msg: "Error en el registro de equipo", estado: false }, { status: 501 })
    }
}

export async function PUT(request) {
    const db = await openDB()
    db.connect()
    const { codigo_sap, nombre, cantidad_piezas, especificaciones, marca, categoria_id, area_id, equipo_id } = await request.json()
    const [result, fields] = await db.query('UPDATE tbl_equipos_biomedicos SET codigo_sap = ?, nombre = ?, cantidad_piezas = ?, especificaciones = ?, marca = ?, categoria_id = ?, area_id = ? WHERE equipo_id = ?', [codigo_sap, nombre, cantidad_piezas, especificaciones, marca, categoria_id, area_id, equipo_id]);
    db.end()
    if (result.changedRows > 0) {
        return NextResponse.json({ msg: "Equipo editado", estado: true }, { status: 202 })
    } else {
        return NextResponse.json({ msg: "Error en la edición de equipo", estado: false }, { status: 502 })
    }
}