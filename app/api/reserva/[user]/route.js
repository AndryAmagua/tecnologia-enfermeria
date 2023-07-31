import { NextResponse } from 'next/server';
import openDB from '@/config/db'

export async function GET(request, { params }) {
    const db = await openDB()
    if (db.estado === undefined) {
        db.connect()
        const solicitante = await params.user
        const [rows, fields] = await db.query('SELECT A.SOL_ID, A.SOL_GUIA, A.SOL_FECHA, A.SOL_HORA_INGRESO, A.SOL_HORA_SALIDA, A.SOL_ESTUDIANTES, A.SOL_ESTADO, A.SOL_OBSERVACION, B.TIR_NOMBRE, C.CAR_NOMBRE, D.NIV_NOMBRE, E.PAR_NOMBRE, F.PEA_NOMBRE, G.LAB_NOMBRE, H.MOT_DESCRIPCION, I.CAT_NOMBRE FROM tbl_solicitud_reserva AS A INNER JOIN tbl_tipo_reserva AS B ON A.TIR_ID = B.TIR_ID LEFT JOIN tbl_carrera AS C ON A.CAR_ID = C.CAR_ID LEFT JOIN tbl_nivel AS D ON A.NIV_ID = D.NIV_ID LEFT JOIN tbl_paralelo AS E ON A.PAR_ID = E.PAR_ID INNER JOIN tbl_periodo_academico AS F ON A.PEA_ID = F.PEA_ID INNER JOIN tbl_laboratorios AS G ON A.LAB_ID = G.LAB_ID LEFT JOIN tbl_motivo AS H ON A.MOT_ID = H.MOT_ID INNER JOIN tbl_catedra AS I ON A.CAT_ID = I.CAT_ID WHERE A.SOL_SOLICITANTE = ? ORDER BY A.SOL_ID DESC', [solicitante])
        db.end()
        return NextResponse.json({ data: rows }, { status: 200 })

    } else {
        return NextResponse.json({ data: [] }, { status: 500 })
    }
}