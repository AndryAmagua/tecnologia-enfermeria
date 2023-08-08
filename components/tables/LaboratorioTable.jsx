import Image from 'next/image'
import editSVG from '@/public/edit.svg'
import deleteSVG from '@/public/delete.svg'
import MUIDataTable from "mui-datatables"

function LaboratorioTable({ data, onEdit, onDelete }) {
    const columns = [
        {
            name: 'LAB_NOMBRE',
            label: "NOMBRE DE LABORATORIO",
        },
        {
            name: 'LAB_CAPACIDAD',
            label: "CAPACIDAD",
        },
        {
            name: 'LAB_TIPO',
            label: "USO DEL ÁREA",
        },
        {
            name: 'actions',
            label: "ACCIONES",
            options: {
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
                                const id = data[dataIndex].LAB_ID
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
        filter: false,
        print: false,
        search: false,
        sort:false,
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
            title={"Catálogo de laboratorios y espacios"}
            data={data}
            columns={columns}
            options={options}
        />
    )
}

export default LaboratorioTable