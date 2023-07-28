import { NextResponse } from 'next/server';
import openDB from '@/config/db'

export async function GET(request) {
    const db = await openDB()
    if (db.estado === undefined) {
        db.connect()
        const [rows, fields] = await db.query('SELECT tbl_equipos_biomedicos.EQU_ID ,tbl_equipos_biomedicos.EQU_CODIGO_SAP, tbl_equipos_biomedicos.EQU_NOMBRE, tbl_equipos_biomedicos.EQU_CANTIDAD_PIEZAS, tbl_equipos_biomedicos.EQU_ESPECIFICACIONES, tbl_equipos_biomedicos.EQU_MARCA, tbl_equipos_biomedicos.EQU_FECHA_MANTENIMIENTO, tbl_tipos_equipo.TIP_ID, tbl_tipos_equipo.TIP_NOMBRE,tbl_laboratorios.LAB_ID, tbl_laboratorios.LAB_NOMBRE, tbl_equipos_biomedicos.EQU_DISPONIBILIDAD FROM ((tbl_equipos_biomedicos INNER JOIN tbl_laboratorios ON tbl_equipos_biomedicos.LAB_ID = tbl_laboratorios.LAB_ID)INNER JOIN tbl_tipos_equipo ON tbl_equipos_biomedicos.TIP_ID = tbl_tipos_equipo.TIP_ID) WHERE EQU_ESTADO = 1')
        db.end()
        return NextResponse.json({ data: rows }, { status: 200 })

    } else {
        return NextResponse.json({ data: [] }, { status: 500 })
    }
}

export async function POST(request) {
    const db = await openDB()
    db.connect()
    const { codigo, nombre, cantidad, especificacion, marca, mantenimiento, categoriaID, laboratorioID } = await request.json()
    const [result, fields] = await db.query('INSERT INTO tbl_equipos_biomedicos (EQU_CODIGO_SAP, EQU_NOMBRE, EQU_CANTIDAD_PIEZAS, EQU_ESPECIFICACIONES, EQU_MARCA, EQU_FECHA_MANTENIMIENTO, TIP_ID, LAB_ID) VALUES (?, ?, ?, ?, ?, ?, ?, ?)', [codigo, nombre, cantidad, especificacion, marca, mantenimiento, categoriaID, laboratorioID]);
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
    const { codigo, nombre, cantidad, especificacion, marca, mantenimiento, categoriaID, laboratorioID, id } = await request.json()
    const [result, fields] = await db.query('UPDATE tbl_equipos_biomedicos SET EQU_CODIGO_SAP = ?, EQU_NOMBRE = ?, EQU_CANTIDAD_PIEZAS = ?, EQU_ESPECIFICACIONES = ?, EQU_MARCA = ?, EQU_FECHA_MANTENIMIENTO = ?, TIP_ID = ?, LAB_ID = ? WHERE EQU_ID = ?', [codigo, nombre, cantidad, especificacion, marca, mantenimiento, categoriaID, laboratorioID, id]);
    db.end()
    if (result.changedRows > 0) {
        return NextResponse.json({ msg: "Equipo editado", estado: true }, { status: 202 })
    } else {
        return NextResponse.json({ msg: "Error en la edición de equipo", estado: false }, { status: 502 })
    }
}