import Image from 'next/image'
import editSVG from '@/public/edit.svg'
import MUIDataTable from "mui-datatables"

function ReservasExternasTable({ data, onEdit }) {
    const columns = [
        {
            name: 'solicitante',
            label: "SOLICITANTE",
            options: {
                filter: false,
                sort: false,
                customBodyRender: (value, tableMeta) => {
                    const dataIndex = tableMeta.rowIndex
                    const row = data[dataIndex]
                    return (
                        <>
                            {row['PER_NOMBRES']}  {row['PER_APELLIDOS']}
                        </>
                    )
                }
            }
        },
        {
            name: 'LAB_NOMBRE',
            label: "ESPACIO DE RESERVA ",
        },
        {
            name: 'SOE_GUIA',
            label: "GUÍA",
        },
        {
            name: 'SOE_FECHA',
            label: "FECHA",
        },
        {
            name: 'horario',
            label: "HORA INICIO Y FIN",
            options: {
                filter: false,
                sort: false,
                customBodyRender: (value, tableMeta) => {
                    const dataIndex = tableMeta.rowIndex
                    const row = data[dataIndex]
                    return (
                        <>
                            {row['SOE_HORA_INGRESO']} - {row['SOE_HORA_SALIDA']}
                        </>
                    )
                }
            }
        },
        {
            name: 'SOE_ESTADO',
            label: "ESTADO",
            options: {
                filter: false,
                sort: false,
                customBodyRender: (value, tableMeta) => {
                    const dataIndex = tableMeta.rowIndex
                    const row = data[dataIndex]
                    return (
                        <>
                            {
                                value === 0 ?
                                    <>PENDIENTE</>
                                    : value === 1 ?
                                        <>APROBADO</>
                                        :
                                        <>RECHAZADO</>
                            }
                        </>
                    )
                }
            }
        },
        {
            name: 'actions',
            label: "ACCIONES",
            options: {
                filter: false,
                sort: false,
                customBodyRender: (value, tableMeta) => {
                    return (
                        <>
                            <button type="button" className="btn btn-outline-info btn-sm mx-2" onClick={() => {
                                const dataIndex = tableMeta.rowIndex
                                const row = data[dataIndex]
                                onEdit(row)
                            }}>
                                <Image src={editSVG} alt="SVG Edit" />
                            </button>
                        </>
                    )
                }
            }
        }
    ]

    const options = {
        filterType: 'dropdown',
        responsive: "simple",
        print: false,
        viewColumns: false,
        selectableRows: 'none',
        textLabels: {
            body: {
                noMatch: "No hay registros que mostrar",
            },
            pagination: {
                next: "Siguiente Página",
                previous: "Página anterior",
                rowsPerPage: "Filas por página",
                displayRows: "de",
            }
        }
    }

    return (
        <MUIDataTable
            title={"Solicitudes de reserva"}
            data={data}
            columns={columns}
            options={options}
        />
    )
}

export default ReservasExternasTable