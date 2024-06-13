import Image from 'next/image'
import editSVG from '@/public/edit.svg'
import MUIDataTable from "mui-datatables"

function ReservasTable({ data, onEdit }) {
    const columns = [
        {
            name: 'modalidad',
            label: "MODALIDAD",
        },
        {
            name: 'MOT_DESCRIPCION',
            label: "MOTIVO DE RESERVA",
            options: {
                filter: false,
                display: false
            }
        },
        {
            name: 'solicitante',
            label: "SOLICITANTE",
        },
        {
            name: 'asignatura',
            label: "ASIGNATURA",
        },
        {
            name: 'area',
            label: "ÁREA'",
            options: {
                filter: false,
                display: false
            }
        },
        {
            name: 'nivel',
            label: "NIVEL",
            options: {
                filter: false,
                display: false
            }
        },
        {
            name: 'paralelo',
            label: "PARALELO",
            options: {
                filter: false,
                display: false
            }
        },
        {
            name: 'fecha',
            label: "FECHA",
        },
        {
            name: 'horaInicio',
            label: "HORA INICIO",
            options: {
                filter: false,
                display: false
            }
        },
        {
            name: 'horaFin',
            label: "HORA FIN",
            options: {
                filter: false,
                display: false
            }
        },
        {
            name: 'horario',
            label: "HORA INICIO Y FIN",
            options: {
                download: false,
                filter: false,
                customBodyRender: (value, tableMeta) => {
                    const dataIndex = tableMeta.rowIndex
                    const row = data[dataIndex]
                    return (
                        <>
                            {row['horaInicio']} - {row['horaFin']}
                        </>
                    )
                }
            }
        },
        {
            name: 'temaGuia',
            label: "TEMA Y N° GUIA",
        },
        {
            name: 'ejecucion',
            label: "ETAPA DE PRÁCTICA",
        },
        {
            name: 'estado',
            label: "ESTADO",
            options: {
                filter: false,
            }
        },
        {
            name: 'actions',
            label: "ACCIONES",
            options: {
                filter: false,
                download: false,
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
        responsive: "vertical",
        sort: false,
        viewColumns: false,
        selectableRows: 'none',
        rowsPerPage: 5,
        rowsPerPageOptions: [5, 10, 20],
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
            title={"Lista de solicitudes de reservas internas"}
            data={data}
            columns={columns}
            options={options}
        />
    )
}

export default ReservasTable