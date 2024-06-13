import { NextResponse } from 'next/server';
import openDB from '@/config/db'

export async function GET(request, { params }) {
    const db = await openDB()
    if (db.estado === undefined) {
        db.connect()
        const id = await params.id
        const [rows, fields] = await db.query('SELECT A.solicitud_id, A.tema, A.asistentes, A.fecha, A.horaInicio, A.horaFin, A.detalle, A.observacion, B.area_id, B.nombre, C.estado_id, C.nombre FROM tbl_solicitud_externa AS A INNER JOIN area_reserva AS B ON A.area_id = B.area_id INNER JOIN tbl_estado_solicitud AS C ON A.estado_id = C.estado_id WHERE A.externo_id = ? ORDER BY A.solicitud_id DESC', [id])
        db.end()
        return NextResponse.json({ data: rows }, { status: 200 })

    } else {
        return NextResponse.json({ data: [] }, { status: 500 })
    }
}

export async function PUT(request, { params }) {
    const db = await openDB()
    db.connect()
    const id = await params.id
    const { tema, asistentes, area_id, fecha, horaInicio, horaFin, solicitud_id } = await request.json()

    const [result, fields] = await db.query('UPDATE tbl_solicitud_externa SET tema = ?, asistentes = ?, area_id = ?, fecha = ?, horaInicio = ?, horaFin = ?, estado = 1 WHERE solicitud_id = ?', [tema, asistentes, area_id, fecha, horaInicio, horaFin, solicitud_id]);
    db.end()
    if (result.changedRows > 0) {
        return NextResponse.json({ msg: "Solicitud editada", estado: true }, { status: 201 })
    } else {
        return NextResponse.json({ msg: "Error en la edición de solicitud", estado: false }, { status: 501 })
    }
}