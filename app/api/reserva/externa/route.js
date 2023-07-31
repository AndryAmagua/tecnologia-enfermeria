import { NextResponse } from 'next/server';
import openDB from '@/config/db'

export async function GET(request) {
    const db = await openDB()
    if (db.estado === undefined) {
        db.connect()
        const [rows, fields] = await db.query('SELECT A.SOE_ID, A.SOE_GUIA, A.SOE_ASISTENTES, A.SOE_FECHA, A.SOE_HORA_INGRESO, A.SOE_HORA_SALIDA, A.SOE_OBSERVACION, A.SOE_ESTADO, B.TIR_NOMBRE, C.PER_NOMBRES, C.PER_APELLIDOS, C.PER_INSTITUCION, D.PEA_NOMBRE, E.LAB_NOMBRE FROM tbl_solicitud_externa AS A INNER JOIN tbl_tipo_reserva AS B ON A.TIR_ID = B.TIR_ID INNER JOIN tbl_personal_externo AS C ON A.PER_ID = C.PER_ID INNER JOIN tbl_periodo_academico AS D ON A.PEA_ID = D.PEA_ID INNER JOIN tbl_laboratorios AS E ON A.LAB_ID = E.LAB_ID ORDER BY A.SOE_ID DESC')
        db.end()
        return NextResponse.json({ data: rows }, { status: 200 })

    } else {
        return NextResponse.json({ data: [] }, { status: 500 })
    }
}

export async function POST(request) {
    const db = await openDB()
    db.connect()
    const { tipoSolicitud, solicitante, guia, asistentes, periodo, laboratorioId, fecha, horaIngreso, horaSalida } = await request.json()
    const [result, fields] = await db.query('INSERT INTO tbl_solicitud_externa ( TIR_ID, PER_ID, SOE_GUIA, SOE_ASISTENTES, PEA_ID, LAB_ID, SOE_FECHA, SOE_HORA_INGRESO, SOE_HORA_SALIDA) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?)', [tipoSolicitud, solicitante, guia, asistentes, periodo, laboratorioId, fecha, horaIngreso, horaSalida])
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
    const { estado, observacion, id } = await request.json()
    const [result, fields] = await db.query('UPDATE tbl_solicitud_externa SET SOE_ESTADO = ?, SOE_OBSERVACION = ? WHERE SOE_ID = ?', [estado, observacion, id]);
    db.end()
    if (result.changedRows > 0) {
        return NextResponse.json({ msg: "Solicitud editada", estado: true }, { status: 202 })
    } else {
        return NextResponse.json({ msg: "Error en la edición de solicitud", estado: false }, { status: 502 })
    }
}