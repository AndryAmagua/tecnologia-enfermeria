import Image from 'next/image'
import editSVG from '@/public/edit.svg'
import deleteSVG from '@/public/delete.svg'
import MUIDataTable from "mui-datatables"

function InsumoTable({ data, onEdit, onDelete }) {
    const columns = [
        {
            name: 'INS_NOMBRE',
            label: "Nombre",
            options: {
                filter: false
            }
        },
        {
            name: 'INS_DESCRIPCION',
            label: "Descripción",
            options: {
                filter: false
            }
        },
        {
            name: 'INS_UNIDAD_MEDIDA',
            label: "Unidad de medida",
            options: {
                filter: false
            }
        },
        {
            name: 'INS_PRESENTACION',
            label: "Presentación",
            options: {
                filter: false
            }
        },
        {
            name: 'INS_STOCK_MINIMO',
            label: "Stock mínimo",
            options: {
                filter: false
            }
        },
        {
            name: 'LAB_NOMBRE',
            label: "Ubicacion",
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
                                const id = data[dataIndex].INS_ID
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
                title={"Lista de insumos"}
                data={data}
                columns={columns}
                options={options}
            />
        </div>
    )
}

export default InsumoTable