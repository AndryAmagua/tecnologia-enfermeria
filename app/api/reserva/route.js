import { NextResponse } from 'next/server';
import openDB from '@/config/db'

export async function GET(request) {
    const db = await openDB()
    if (db.estado === undefined) {
        db.connect()
        const [rows, fields] = await db.query('SELECT A.SOL_ID, A.SOL_SOLICITANTE, H.MOT_DESCRIPCION, I.CAT_NOMBRE, A.SOL_GUIA, A.SOL_FECHA, A.SOL_HORA_INGRESO, A.SOL_HORA_SALIDA, A.SOL_ESTUDIANTES, A.SOL_ESTADO, A.SOL_OBSERVACION, B.TIR_NOMBRE, C.CAR_NOMBRE, D.NIV_NOMBRE, E.PAR_NOMBRE, F.PEA_NOMBRE, G.LAB_NOMBRE FROM tbl_solicitud_reserva AS A INNER JOIN tbl_tipo_reserva AS B ON A.TIR_ID = B.TIR_ID INNER JOIN tbl_carrera AS C ON A.CAR_ID = C.CAR_ID INNER JOIN tbl_nivel AS D ON A.NIV_ID = D.NIV_ID INNER JOIN tbl_paralelo AS E ON A.PAR_ID = E.PAR_ID INNER JOIN tbl_periodo_academico AS F ON A.PEA_ID = F.PEA_ID INNER JOIN tbl_laboratorios AS G ON A.LAB_ID = G.LAB_ID INNER JOIN tbl_motivo AS H ON A.MOT_ID = H.MOT_ID INNER JOIN tbl_catedra AS I ON A.CAT_ID = I.CAT_ID')
        db.end()
        return NextResponse.json({ data: rows }, { status: 200 })

    } else {
        return NextResponse.json({ data: [] }, { status: 500 })
    }
}

export async function POST(request) {
    const db = await openDB()
    db.connect()
    const { tipoSolicitud, solicitante, motivo, catedra, guia, carrera, nivel, paralelo, periodoAcademico, fecha, horaIngreso, horaSalida, estudiantes, laboratorioId } = await request.json()
    const [result, fields] = await db.query('INSERT INTO tbl_solicitud_reserva ( TIR_ID, SOL_SOLICITANTE, MOT_ID, CAT_ID, SOL_GUIA, CAR_ID, NIV_ID, PAR_ID, PEA_ID, SOL_FECHA, SOL_HORA_INGRESO, SOL_HORA_SALIDA, SOL_ESTUDIANTES, LAB_ID) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)', [tipoSolicitud, solicitante, motivo, catedra, guia, carrera, nivel, paralelo, periodoAcademico, fecha, horaIngreso, horaSalida, estudiantes, laboratorioId])
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
    const [result, fields] = await db.query('UPDATE tbl_solicitud_reserva SET SOL_ESTADO = ?, SOL_OBSERVACION = ? WHERE SOL_ID = ?', [estado, observacion, id]);
    db.end()
    if (result.changedRows > 0) {
        return NextResponse.json({ msg: "Solicitud editada", estado: true }, { status: 202 })
    } else {
        return NextResponse.json({ msg: "Error en la edición de solicitud", estado: false }, { status: 502 })
    }
}