import Image from 'next/image'
import editSVG from '@/public/edit.svg'
import deleteSVG from '@/public/delete.svg'
import MUIDataTable from "mui-datatables"

function EquipoTable({ data, onEdit, onDelete }) {
    const columns = [
        {
            name: 'EQU_CODIGO_SAP',
            label: "Código SAP",
            options: {
                filter: false
            }
        },
        {
            name: 'EQU_NOMBRE',
            label: "Nombre",
            options: {
                filter: false
            }
        },
        {
            name: 'EQU_CANTIDAD_PIEZAS',
            label: "Piezas",
            options: {
                filter: false
            }
        },
        {
            name: 'EQU_ESPECIFICACIONES',
            label: "Especificaciones",
            options: {
                filter: false
            }
        },
        {
            name: 'EQU_MARCA',
            label: "Marca",
            options: {
                filter: false
            }
        },
        {
            name: 'EQU_FECHA_MANTENIMIENTO',
            label: "Mantenimiento",
            options: {
                filter: false
            }
        },
        {
            name: 'TIP_NOMBRE',
            label: "Categoría",
        },
        {
            name: 'LAB_NOMBRE',
            label: "Ubicacion",
        },
        {
            name: 'EQU_DISPONIBILIDAD',
            label: "Disponibilidad",
            options: {
                filter: false
            }
        },
        {
            name: 'actions',
            label: "Acciones",
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
                title={"Lista de equipos biomedicos"}
                data={data}
                columns={columns}
                options={options}
            />
        </div>
    )
}

export default EquipoTable