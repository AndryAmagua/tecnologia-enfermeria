import Image from 'next/image'
import editSVG from '@/public/edit.svg'
import deleteSVG from '@/public/delete.svg'
import MUIDataTable from "mui-datatables"

function InsumoTable({ data, onEdit, onDelete }) {
    const columns = [
        {
            name: 'nombre',
            label: "NOMBRE",
            options: {
                filter: false
            }
        },
        {
            name: 'descripcion',
            label: "DESCRIPCIÓN",
            options: {
                filter: false
            }
        },
        {
            name: 'unidad_medida',
            label: "UNIDAD DE MEDIDA",
            options: {
                filter: false
            }
        },
        {
            name: 'presentacion',
            label: "PRESENTACIÓN",
            options: {
                filter: false
            }
        },
        {
            name: 'stock_minimo',
            label: "STOCK MINIMO",
            options: {
                filter: false
            }
        },
        {
            name: 'area',
            label: "UBICACIÓN",
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
                                const id = data[dataIndex].insumo_id
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
                title={"Catálogo de insumos"}
                data={data}
                columns={columns}
                options={options}
            />
        </div>
    )
}

export default InsumoTable