import Image from 'next/image'
import editSVG from '@/public/edit.svg'
import MUIDataTable from "mui-datatables"

function ReservasTable({ data, onEdit }) {
    const columns = [
        {
            name: 'TIR_NOMBRE',
            label: "TIPO DE SOLICITUD",
        },
        {
            name: 'SOL_SOLICITANTE',
            label: "SOLICITANTE",
        },
        {
            name: 'CAT_NOMBRE',
            label: "CÁTEDRA",
        },
        {
            name: 'LAB_NOMBRE',
            label: "ESPACIO DE RESERVA ",
        },
        {
            name: 'SOL_GUIA',
            label: "GUÍA",
        },
        {
            name: 'SOL_FECHA',
            label: "FECHA",
        },
        {
            name: 'horario',
            label: "HORA INICIO Y FIN",
            options: {
                filter: false,
                customBodyRender: (value, tableMeta) => {
                    const dataIndex = tableMeta.rowIndex
                    const row = data[dataIndex]
                    return (
                        <>
                            {row['SOL_HORA_INGRESO']} - {row['SOL_HORA_SALIDA']}
                        </>
                    )
                }
            }
        },
        {
            name: 'PEA_NOMBRE',
            label: "PERIODO ACADÉMICO",
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
            title={"Lista de solicitudes de reservas internas"}
            data={data}
            columns={columns}
            options={options}
        />
    )
}

export default ReservasTable