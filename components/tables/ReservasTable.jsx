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
            name: 'solicitante',
            label: "SOLICITANTE",
        },
        {
            name: 'asignatura/especialidad',
            label: "ASIGNATURA / ESPECIALIDAD",
            options: {
                download: false,
                filter: false,
                customBodyRender: (value, tableMeta) => {
                    const dataIndex = tableMeta.rowIndex
                    const row = data[dataIndex]
                    return (
                        <>
                            {
                                row['asignatura'] ?
                                    <span>{row['asignatura']}</span>
                                    :
                                    <span>{row['especialidad']}</span>
                            }
                        </>
                    )
                }
            }
        },
        {
            name: 'asignatura',
            label: "ASIGNATURA",
            options: {
                filter: false,
                display: false
            }
        },
        {
            name: 'especialidad',
            label: "ESPECIALIDAD",
            options: {
                filter: false,
                display: false
            }
        },
        {
            name: 'area',
            label: "ÁREA",
            options: {
                filter: false,
                display: false
            }
        },
        {
            name: 'aula',
            label: "AULA",
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
            options: {
                display: false
            }
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
            label: "FECHA Y HORAS",
            options: {
                download: false,
                filter: false,
                customBodyRender: (value, tableMeta) => {
                    const dataIndex = tableMeta.rowIndex
                    const row = data[dataIndex]
                    return (
                        <div>
                            <div>{row['fecha']}</div>
                            <div>{row['horaInicio']} - {row['horaFin']}</div>
                        </div>
                    )
                }
            }
        },
        {
            name: 'temaGuia',
            label: "TEMA Y N° GUIA",
            options: {
                filter: false,
                display: false
            }
        },
        {
            name: 'ejecucion',
            label: "ETAPA DE PRÁCTICA",
            options: {
                filter: false,
                display: false
            }
        },
        {
            name: 'estado',
            label: "ESTADO"
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
        },
        downloadOptions: {
            filename: 'excel-format.csv',
            separator: ';',
            filterOptions: {
                useDisplayedColumnsOnly: false,
                useDisplayedRowsOnly: true,
            }
        },
        onDownload: (buildHead, buildBody, columns, data) => {
            return "\uFEFF" + buildHead(columns) + buildBody(data);
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