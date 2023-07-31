import Image from 'next/image'
import editSVG from '@/public/edit.svg'
import deleteSVG from '@/public/delete.svg'
import MUIDataTable from "mui-datatables"

function EquipoTable({ data, onEdit, onDelete }) {
    const columns = [
        {
            name: 'EQU_CODIGO_SAP',
            label: "CÓDIGO SAP",
            options: {
                filter: false
            }
        },
        {
            name: 'EQU_NOMBRE',
            label: "NOMBRE",
            options: {
                filter: false
            }
        },
        {
            name: 'EQU_CANTIDAD_PIEZAS',
            label: "PIEZAS",
            options: {
                filter: false
            }
        },
        {
            name: 'EQU_ESPECIFICACIONES',
            label: "ESPECIFICACIONES",
            options: {
                filter: false
            }
        },
        {
            name: 'EQU_MARCA',
            label: "MARCA",
            options: {
                filter: false
            }
        },
        {
            name: 'EQU_FECHA_MANTENIMIENTO',
            label: "MANTENIMIENTO",
            options: {
                filter: false
            }
        },
        {
            name: 'TIP_NOMBRE',
            label: "CATEGORÍA",
        },
        {
            name: 'LAB_NOMBRE',
            label: "UBICACIÓN",
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
                            <button type="button" className="btn btn-outline-danger btn-sm mx-2" onClick={() => {
                                const dataIndex = tableMeta.rowIndex
                                const id = data[dataIndex].EQU_ID
                                onDelete(id)
                            }}>
                                <Image src={deleteSVG} alt="SVG Delete" />
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
        download: false,
        print: false,
        viewColumns: false,
        selectableRows: 'none',
        sort: false,
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
        <div className="table-responsive-sm mt-3">
            <MUIDataTable
                title={"Catálogo de equipos biomedicos"}
                data={data}
                columns={columns}
                options={options}
            />
        </div>
    )
}

export default EquipoTable