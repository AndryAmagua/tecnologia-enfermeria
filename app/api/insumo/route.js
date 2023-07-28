import { NextResponse } from 'next/server';
import openDB from '@/config/db'

export async function GET(request) {
    const db = await openDB()
    if (db.estado === undefined) {
        db.connect()
        const [rows, fields] = await db.query('SELECT tbl_insumos.INS_ID ,tbl_insumos.INS_NOMBRE, tbl_insumos.INS_DESCRIPCION, tbl_insumos.INS_UNIDAD_MEDIDA, tbl_insumos.INS_PRESENTACION, tbl_insumos.INS_STOCK_MINIMO, tbl_laboratorios.LAB_ID, tbl_laboratorios.LAB_NOMBRE FROM tbl_insumos INNER JOIN tbl_laboratorios ON tbl_insumos.LAB_ID = tbl_laboratorios.LAB_ID WHERE INS_ESTADO = 1')
        db.end()
        return NextResponse.json({ data: rows }, { status: 200 })

    } else {
        return NextResponse.json({ data: [] }, { status: 500 })
    }
}

export async function POST(request) {
    const db = await openDB()
    db.connect()
    const { nombre, descripcion, unidad, presentacion, stockMinimo, laboratorioID } = await request.json()
    const [result, fields] = await db.query('INSERT INTO tbl_insumos (INS_NOMBRE, INS_DESCRIPCION, INS_UNIDAD_MEDIDA, INS_PRESENTACION, INS_STOCK_MINIMO, LAB_ID) VALUES (?, ?, ?, ?, ?, ?)', [nombre, descripcion, unidad, presentacion, stockMinimo, laboratorioID]);
    await db.query('INSERT INTO tbl_movimientos_insumos (INS_ID) VALUES (?)', [result.insertId]);
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
    const { nombre, descripcion, unidad, presentacion, stockMinimo, laboratorioID, id } = await request.json()
    const [result, fields] = await db.query('UPDATE tbl_insumos SET INS_NOMBRE = ?, INS_DESCRIPCION = ?, INS_UNIDAD_MEDIDA = ?, INS_PRESENTACION = ?, INS_STOCK_MINIMO = ?, LAB_ID = ? WHERE INS_ID = ?', [nombre, descripcion, unidad, presentacion, stockMinimo, laboratorioID, id]);
    db.end()
    if (result.changedRows > 0) {
        return NextResponse.json({ msg: "Insumo editado", estado: true }, { status: 202 })
    } else {
        return NextResponse.json({ msg: "Error en la edición de insumo", estado: false }, { status: 502 })
    }
}