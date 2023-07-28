import Image from 'next/image'
import editSVG from '@/public/edit.svg'
import deleteSVG from '@/public/delete.svg'
import MUIDataTable from "mui-datatables"

function LaboratorioTable({ data, onEdit, onDelete }) {
    const columns = [
        {
            name: 'LAB_NOMBRE',
            label: "Nombre de laboratorio",
        },
        {
            name: 'LAB_CAPACIDAD',
            label: "Capacidad",
        },
        {
            name: 'LAB_TIPO',
            label: "Uso del área",
        },
        {
            name: 'actions',
            label: "Acciones",
            options: {
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
        responsive: "standard",
        download: false,
        filter: false,
        print: false,
        search: false,
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
            title={"Lista laboratorios y espacios"}
            data={data}
            columns={columns}
            options={options}
        />
    )
}

export default LaboratorioTable