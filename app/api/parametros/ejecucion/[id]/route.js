import { NextResponse } from 'next/server';
import openDB from '@/config/db'

export async function DELETE(request, { params }) {
    const db = await openDB()
    db.connect()
    const id = await params.id
    const [result, fields] = await db.query('UPDATE tbl_ejecucion_practica SET estado = 0 WHERE ejecucion_id = ?', [id]);
    db.end()
    if (result.changedRows > 0) {
        return NextResponse.json({ msg: "Etapa de práctica eliminada", estado: true }, { status: 203 })
    } else {
        return NextResponse.json({ msg: "Error en la eliminación de etapa de práctica", estado: false }, { status: 503 })
    }
}