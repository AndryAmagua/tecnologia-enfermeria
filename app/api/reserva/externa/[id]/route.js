import { NextResponse } from 'next/server';
import openDB from '@/config/db'

export async function GET(request, { params }) {
    const db = await openDB()
    if (db.estado === undefined) {
        db.connect()
        const id = await params.id
        const [rows, fields] = await db.query('SELECT A. SOE_ID, A.SOE_GUIA, A.SOE_ASISTENTES, C.PEA_ID, D.LAB_ID, A.SOE_FECHA, A.SOE_HORA_INGRESO, A.SOE_HORA_SALIDA, A.SOE_OBSERVACION, B.EST_ID, B.EST_NOMBRE, C.PEA_NOMBRE, D.LAB_NOMBRE FROM tbl_solicitud_externa AS A INNER JOIN tbl_estado_solicitud AS B ON A.EST_ID = B.EST_ID INNER JOIN tbl_periodo_academico AS C ON A.PEA_ID = C.PEA_ID INNER JOIN tbl_laboratorios AS D ON A.LAB_ID = D.LAB_ID WHERE A.PER_ID = ? ORDER BY A.SOE_ID DESC', [id])
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
    const { guia, asistentes, periodo, laboratorioId, fecha, horaIngreso, horaSalida } = await request.json()

    const [result, fields] = await db.query('UPDATE tbl_solicitud_externa SET SOE_GUIA = ?, SOE_ASISTENTES = ?, PEA_ID = ?, LAB_ID = ?, SOE_FECHA = ?, SOE_HORA_INGRESO = ?, SOE_HORA_SALIDA = ?, EST_ID = 1 WHERE SOE_ID = ?', [guia, asistentes, periodo, laboratorioId, fecha, horaIngreso, horaSalida, id]);
    db.end()
    if (result.changedRows > 0) {
        return NextResponse.json({ msg: "Solicitud editada", estado: true }, { status: 201 })
    } else {
        return NextResponse.json({ msg: "Error en la edición de solicitud", estado: false }, { status: 501 })
    }
}