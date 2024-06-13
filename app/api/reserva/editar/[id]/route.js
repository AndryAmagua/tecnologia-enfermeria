import { NextResponse } from 'next/server';
import openDB from '@/config/db'

export async function PUT(request, { params }) {
    const db = await openDB()
    db.connect()
    const id = await params.id
    const { carrera_id, periodo_id, modalidad, solicitante, asignatura_id, area_id, aula, nivel, paralelo, fecha, horaInicio, horaFin, temaGuia, detalle } = await request.json()
    const [result, fields] = await db.query('UPDATE tbl_solicitud_reserva SET carrera_id = ?, periodo_id = ?, modalidad = ?, solicitante = ?, asignatura_id = ?, area_id = ?, aula = ?, nivel = ?, paralelo = ?, fecha = ?, horaInicio = ?, horaFin = ?, temaGuia = ?, detalle = ?, estado_id = 1 WHERE solicitud_id = ?', [carrera_id, periodo_id, modalidad, solicitante, asignatura_id, area_id, aula, nivel, paralelo, fecha, horaInicio, horaFin, temaGuia, detalle, id]);
    db.end()
    if (result.changedRows > 0) {
        return NextResponse.json({ msg: "Solicitud editada", estado: true }, { status: 202 })
    } else {
        return NextResponse.json({ msg: "Error en la edición de solicitud", estado: false }, { status: 502 })
    }
}