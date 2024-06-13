import { NextResponse } from 'next/server';
import openDB from '@/config/db'

export async function GET(request) {
    const db = await openDB()
    if (db.estado === undefined) {
        db.connect()
        const [rows, fields] = await db.query('SELECT A.insumo_id ,A.nombre, A.descripcion, A.unidad_medida, A.presentacion, A.stock_minimo, B.area_id, B.nombre AS area FROM tbl_insumos AS A INNER JOIN tbl_area_reserva B ON A.area_id = B.area_id WHERE A.estado = 1')
        db.end()
        return NextResponse.json({ data: rows }, { status: 200 })

    } else {
        return NextResponse.json({ data: [] }, { status: 500 })
    }
}

export async function POST(request) {
    const db = await openDB()
    db.connect()
    const { nombre, descripcion, unidad_medida, presentacion, stock_minimo, area_id } = await request.json()
    const [result, fields] = await db.query('INSERT INTO tbl_insumos (nombre, descripcion, unidad_medida, presentacion, stock_minimo, area_id) VALUES (?, ?, ?, ?, ?, ?)', [nombre, descripcion, unidad_medida, presentacion, stock_minimo, area_id]);
    await db.query('INSERT INTO tbl_movimientos_insumos (insumo_id) VALUES (?)', [result.insertId]);
    db.end()
    if (result.affectedRows > 0) {
        return NextResponse.json({ msg: "Insumo registrado", estado: true }, { status: 201 })
    } else {
        return NextResponse.json({ msg: "Error en el registro de insumo", estado: false }, { status: 501 })
    }
}

export async function PUT(request) {
    const db = await openDB()
    db.connect()
    const { nombre, descripcion, unidad_medida, presentacion, stock_minimo, area_id, insumo_id } = await request.json()
    const [result, fields] = await db.query('UPDATE tbl_insumos SET nombre = ?, descripcion = ?, unidad_medida = ?, presentacion = ?, stock_minimo = ?, area_id = ? WHERE insumo_id = ?', [nombre, descripcion, unidad_medida, presentacion, stock_minimo, area_id, insumo_id]);
    db.end()
    if (result.changedRows > 0) {
        return NextResponse.json({ msg: "Insumo editado", estado: true }, { status: 202 })
    } else {
        return NextResponse.json({ msg: "Error en la edición de insumo", estado: false }, { status: 502 })
    }
}