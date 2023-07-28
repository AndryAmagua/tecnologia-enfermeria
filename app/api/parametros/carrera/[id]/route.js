import { NextResponse } from 'next/server';
import openDB from '@/config/db'

export async function DELETE(request, { params }) {
    const db = await openDB()
    db.connect()
    const id = await params.id
    const [result, fields] = await db.query('UPDATE tbl_carrera SET CAR_ESTADO = 0 WHERE CAR_ID = ?', [id]);
    db.end()
    if (result.changedRows > 0) {
        return NextResponse.json({ msg: "Carrera eliminada", estado: true }, { status: 203 })
    } else {
        return NextResponse.json({ msg: "Error en la eliminación de carrera", estado: false }, { status: 503 })
    }
}