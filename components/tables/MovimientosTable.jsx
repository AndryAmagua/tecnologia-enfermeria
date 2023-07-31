import Image from 'next/image'
import viewSVG from '@/public/view.svg'
import MUIDataTable from "mui-datatables"

function MovimientosTable({ data, onView }) {
    const columns = [
        {
            name: 'INS_NOMBRE',
            label: "INSUMO",
        },
        {
            name: 'MOI_ENTRADAS_TOTALES',
            label: "ENTRADAS TOTALES",
        },
        {
            name: 'MOI_SALIDAS_TOTALES',
            label: "SALIDAS TOTALES",
        },
        {
            name: 'MOI_EXISTENCIAS',
            label: "EXISTENCIAS",
        },
        {
            name: 'actions',
            label: "ACCIONES",
            options: {
                customBodyRender: (value, tableMeta) => {
                    return (
                        <>
                            <button type="button" className="btn btn-outline-success btn-sm mx-2" onClick={() => {
                                const dataIndex = tableMeta.rowIndex
                                const row = data[dataIndex]
                                onView(row)
                            }}>
                                <Image src={viewSVG} alt="SVG Edit" />
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
        viewColumns: false,
        filter: false,
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
                title={"Índice de movimientos de insumos"}
                data={data}
                columns={columns}
                options={options}
            />
        </div>
    )
}

export default MovimientosTable