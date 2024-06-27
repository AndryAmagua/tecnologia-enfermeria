import Image from 'next/image'
import editSVG from '@/public/edit.svg'
import MUIDataTable from "mui-datatables"

function ReservasExternasTable({ data, onEdit }) {
    const columns = [
        {
            name: 'nombre_completo',
            label: "SOLICITANTE"
        },
        {
            name: 'institucion',
            label: "INSTITUCIÓN"
        },
        {
            name: 'tema',
            label: "TEMA",
            options: {
                filter: false,
                display: false
            }
        },
        {
            name: 'asistentes',
            label: "CANTIDAD DE ASISTENTES",
            options: {
                filter: false,
                display: false
            }
        },
        {
            name: 'area',
            label: "ESPACIO DE RESERVA ",
            options: {
                filter: false
            }
        },
        {
            name: 'fecha',
            label: "FECHA",
        },
        {
            name: 'horaInicio',
            label: "HORA ENTRADA",
            options: {
                filter: false,
                display: false
            }
        },
        {
            name: 'horaFin',
            label: "HORA SALIDA",
            options: {
                filter: false,
                display: false
            }
        },
        {
            name: 'formatTime',
            label: "HORA INICIO Y FIN",
            options: {
                filter: false,
                download: false,
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
        print: false,
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
            title={"Lista de solicitudes de reservas externas"}
            data={data}
            columns={columns}
            options={options}
        />
    )
}

export default ReservasExternasTable