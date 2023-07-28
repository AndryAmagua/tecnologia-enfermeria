import { NextResponse } from 'next/server';
import openDB from '@/config/db'

export async function GET(request, { params }) {
    const db = await openDB()
    if (db.estado === undefined) {
        db.connect()
        const id = await params.id
        const [entradas, fields] = await db.query('SELECT A.ENT_FECHA, A.ENT_CANTIDAD FROM tbl_entradas AS A WHERE A.INS_ID = ?', [id])
        const [salidas, fields2] = await db.query('SELECT B.SAL_FECHA, B.SAL_CANTIDAD FROM tbl_salidas AS B WHERE B.INS_ID = ?', [id])
        db.end()
        return NextResponse.json({ data: { entradas, salidas } }, { status: 200 })

    } else {
        return NextResponse.json({ data: [] }, { status: 500 })
    }
}