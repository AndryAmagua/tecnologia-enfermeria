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
                download: false,
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
            name: 'PER_NOMBRES',
            label: "NOMBRES",
            options: {
                filter: false,
                display: false
            }
        },
        {
            name: 'PER_APELLIDOS',
            label: "APELLIDOS",
            options: {
                filter: false,
                display: false
            }
        },
        {
            name: 'PER_INSTITUCION',
            label: "INSTITUCIÓN",
            options: {
                filter: false,
                display: false
            }
        },
        {
            name: 'SOE_ASISTENTES',
            label: "CANTIDAD DE ASISTENTES",
            options: {
                filter: false,
                display: false
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
            name: 'SOE_HORA_INGRESO',
            label: "HORA ENTRADA",
            options: {
                filter: false,
                display: false
            }
        },
        {
            name: 'SOE_HORA_SALIDA',
            label: "HORA SALIDA",
            options: {
                filter: false,
                display: false
            }
        },
        {
            name: 'horario',
            label: "HORA INICIO Y FIN",
            options: {
                filter: false,
                download: false,
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
            name: 'PEA_NOMBRE',
            label: "PERIODO ACADÉMICO",
            options: {
                filter: false,
                display: false
            }
        },
        {
            name: 'EST_NOMBRE',
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