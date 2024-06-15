import { NextResponse } from 'next/server';
import openDB from '@/config/db'

export async function GET(request, { params }) {
    const db = await openDB()
    if (db.estado === undefined) {
        db.connect()
        const solicitante = await params.user
        const [rows, fields] = await db.query('SELECT A.solicitud_id, A.modalidad, A.aula, A.nivel, A.paralelo, A.fecha, A.horaInicio, A.horaFin, A.temaGuia, A.observacion, A.detalle, B.carrera_id, B.nombre AS carrera, C.periodo_id, C.nombre AS periodo, D.asignatura_id, D.nombre AS asignatura, E.area_id, E.nombre AS area, F.ejecucion_id, F.nombre AS ejecucion, G.estado_id, G.nombre AS estado FROM tbl_solicitud_interna AS A LEFT JOIN tbl_carrera AS B ON A.carrera_id = B.carrera_id LEFT JOIN tbl_periodo_academico AS C ON A.periodo_id = C.periodo_id LEFT JOIN tbl_asignatura AS D ON A.asignatura_id = D.asignatura_id LEFT JOIN tbl_area_reserva AS E ON A.area_id = E.area_id LEFT JOIN tbl_ejecucion_practica AS F ON A.ejecucion_id = F.ejecucion_id LEFT JOIN tbl_estado_solicitud AS G ON A.estado_id = G.estado_id WHERE A.solicitante = ? ORDER BY A.solicitud_id DESC', [solicitante])
        db.end()
        return NextResponse.json({ data: rows }, { status: 200 })

    } else {
        return NextResponse.json({ data: [] }, { status: 500 })
    }
}