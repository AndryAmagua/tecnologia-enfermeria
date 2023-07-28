import Image from 'next/image'
import editSVG from '@/public/edit.svg'
import MUIDataTable from "mui-datatables"

function ReservasTable({ data, onEdit }) {
    const columns = [
        {
            name: 'TIR_NOMBRE',
            label: "Tipo de solicitud",
        },
        {
            name: 'SOL_SOLICITANTE',
            label: "Solicitante",
        },
        {
            name: 'SOL_CATEDRA',
            label: "Cátedra",
        },
        {
            name: 'SOL_GUIA',
            label: "Guía",
        },
        {
            name: 'SOL_FECHA',
            label: "Fecha",
        },
        {
            name: 'PEA_NOMBRE',
            label: "Periodo académico",
        },
        {
            name: 'SOL_ESTADO',
            label: "Estado",
        },
        {
            name: 'actions',
            label: "Acciones",
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
        responsive: "standard",
        download: false,
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

export default ReservasTable