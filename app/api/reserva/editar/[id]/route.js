export async function PUT(request, { params }) {
    const db = await openDB()
    db.connect()
    const id = await params.id
    const { tipoSolicitud, motivo, catedra, guia, carrera, nivel, paralelo, periodoAcademico, fecha, horaIngreso, horaSalida, estudiantes, laboratorioId } = await request.json()
    const [result, fields] = await db.query('UPDATE tbl_solicitud_reserva SET TIR_ID = ?, MOT_ID = ?, CAT_ID = ?, SOL_GUIA = ?, CAR_ID = ?, NIV_ID = ?, PAR_ID = ?, PEA_ID = ?, SOL_FECHA = ?, SOL_HORA_INGRESO = ?, SOL_HORA_SALIDA = ?, SOL_ESTUDIANTES = ?, LAB_ID = ?, EST_ID = 1 WHERE SOL_ID = ?', [tipoSolicitud, motivo, catedra, guia, carrera, nivel, paralelo, periodoAcademico, fecha, horaIngreso, horaSalida, estudiantes, laboratorioId, id]);
    db.end()
    if (result.changedRows > 0) {
        return NextResponse.json({ msg: "Solicitud editada", estado: true }, { status: 202 })
    } else {
        return NextResponse.json({ msg: "Error en la edición de solicitud", estado: false }, { status: 502 })
    }
}