import { NextResponse } from 'next/server';
import openDB from '@/config/db'

export async function GET(request) {
    const db = await openDB()
    if (db.estado === undefined) {
        db.connect()
        const [rows, fields] = await db.query('SELECT A.solicitud_id, A.tema, A.asistentes, A.fecha, A.horaInicio, A.horaFin, A.detalle, A.observacion, B.externo_id, B.nombre_completo, B.institucion, C.area_id, C.nombre AS area, D.estado_id, D.nombre AS estado FROM tbl_solicitud_externa AS A LEFT JOIN tbl_personal_externo AS B ON A.externo_id = B.externo_id LEFT JOIN tbl_area_reserva AS C ON A.area_id = C.area_id LEFT JOIN tbl_estado_solicitud AS D ON A.estado_id = D.estado_id ORDER BY A.solicitud_id DESC')
        db.end()
        return NextResponse.json({ data: rows }, { status: 200 })

    } else {
        return NextResponse.json({ data: [] }, { status: 500 })
    }
}

export async function POST(request) {
    const db = await openDB()
    db.connect()
    const { externo_id, tema, asistentes, area_id, fecha, horaInicio, horaFin, detalle } = await request.json()
    const [result, fields] = await db.query('INSERT INTO tbl_solicitud_externa (externo_id, tema, asistentes, area_id, fecha, horaInicio, horaFin, detalle) VALUES (?, ?, ?, ?, ?, ?, ?, ?)', [externo_id, tema, asistentes, area_id, fecha, horaInicio, horaFin, detalle])
    db.end()
    if (result.affectedRows > 0) {
        return NextResponse.json({ msg: "Solicitud registrada", estado: true }, { status: 201 })
    } else {
        return NextResponse.json({ msg: "Error en el registro de solicitud", estado: false }, { status: 501 })
    }
}

export async function PUT(request) {
    const db = await openDB()
    db.connect()
    const { estado_id, observacion, solicitud_id } = await request.json()
    const [result, fields] = await db.query('UPDATE tbl_solicitud_externa SET estado_id = ?, observacion = ? WHERE solicitud_id = ?', [estado_id, observacion, solicitud_id]);
    db.end()
    if (result.changedRows > 0) {
        return NextResponse.json({ msg: "Solicitud editada", estado: true }, { status: 202 })
    } else {
        return NextResponse.json({ msg: "Error en la edición de solicitud", estado: false }, { status: 502 })
    }
}