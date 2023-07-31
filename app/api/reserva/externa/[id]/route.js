import { NextResponse } from 'next/server';
import openDB from '@/config/db'

export async function GET(request, { params }) {
    const db = await openDB()
    if (db.estado === undefined) {
        db.connect()
        const id = await params.id
        const [rows, fields] = await db.query('SELECT A.SOE_GUIA, A.SOE_ASISTENTES, A.SOE_FECHA, A.SOE_HORA_INGRESO, A.SOE_HORA_SALIDA, A.SOE_OBSERVACION, A.SOE_ESTADO, B.TIR_NOMBRE, C.PEA_NOMBRE, D.LAB_NOMBRE FROM tbl_solicitud_externa AS A INNER JOIN tbl_tipo_reserva AS B ON A.TIR_ID = B.TIR_ID INNER JOIN tbl_periodo_academico AS C ON A.PEA_ID = C.PEA_ID INNER JOIN tbl_laboratorios AS D ON A.LAB_ID = D.LAB_ID WHERE A.SOE_ID = ? ORDER BY A.SOE_ID DESC', [id])
        db.end()
        return NextResponse.json({ data: rows }, { status: 200 })

    } else {
        return NextResponse.json({ data: [] }, { status: 500 })
    }
}