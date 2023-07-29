import Image from 'next/image'
import editSVG from '@/public/edit.svg'
import deleteSVG from '@/public/delete.svg'
import MUIDataTable from "mui-datatables"

function MotivoTable({ data, onEdit, onDelete }) {
    const columns = [
        {
            name: 'MOT_DESCRIPCION',
            label: "Descripción",
        },
        {
            name: 'actions',
            label: "Acciones",
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
                                const id = data[dataIndex].MOT_ID
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
        pagination: false,
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
        <MUIDataTable
            data={data}
            columns={columns}
            options={options}
        />
    )
}

export default MotivoTable