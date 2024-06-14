import { NextResponse } from 'next/server';
import openDB from '@/config/db'

export async function GET(request) {
    const db = await openDB()
    if (db.estado === undefined) {
        db.connect()
        const [rows, fields] = await db.query('SELECT A.solicitud_id, A.modalidad, A.solicitante, A.aula, A.nivel, A.paralelo, A.temaGuia, A.fecha, A.horaInicio, A.horaFin, A.detalle, A.observacion, B.nombre AS carrera, C.nombre AS periodoAcademico, D.nombre AS asignatura, E.nombre AS area, F.nombre AS ejecucion, G.estado_id, G.nombre AS estado FROM tbl_solicitud_interna AS A INNER JOIN tbl_carrera AS B ON A.carrera_id = B.carrera_id INNER JOIN tbl_periodo_academico AS C ON A.periodo_id = C.periodo_id INNER JOIN tbl_asignatura AS D ON A.asignatura_id = D.asignatura_id INNER JOIN tbl_area_reserva AS E ON A.area_id = E.area_id INNER JOIN tbl_ejecucion_practica AS F ON A.ejecucion_id = F.ejecucion_id INNER JOIN tbl_estado_solicitud AS G ON A.estado_id = G.estado_id ORDER BY A.solicitud_id DESC')
        db.end()
        return NextResponse.json({ data: rows }, { status: 200 })

    } else {
        return NextResponse.json({ data: [] }, { status: 500 })
    }
}

export async function POST(request) {
    const db = await openDB()
    db.connect()
    const { carrera_id, periodo_id, modalidad, solicitante, asignatura_id, area_id, aula, nivel, paralelo, fecha, horaInicio, horaFin, temaGuia, ejecucion_id, detalle } = await request.json()
    const [result, fields] = await db.query('INSERT INTO tbl_solicitud_interna ( carrera_id, periodo_id, modalidad, solicitante, asignatura_id, area_id, aula, nivel, paralelo, fecha, horaInicio, horaFin, temaGuia, ejecucion_id, detalle) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)', [carrera_id, periodo_id, modalidad, solicitante, asignatura_id, area_id, aula, nivel, paralelo, fecha, horaInicio, horaFin, temaGuia, ejecucion_id, detalle])
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
    const [result, fields] = await db.query('UPDATE tbl_solicitud_interna SET estado_id = ?, observacion = ? WHERE solicitud_id = ?', [estado_id, observacion, solicitud_id]);
    db.end()
    if (result.changedRows > 0) {
        return NextResponse.json({ msg: "Solicitud editada", estado: true }, { status: 202 })
    } else {
        return NextResponse.json({ msg: "Error en la edición de solicitud", estado: false }, { status: 502 })
    }
}