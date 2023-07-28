import Image from 'next/image'
import viewSVG from '@/public/view.svg'
import MUIDataTable from "mui-datatables"

function MovimientosTable({ data, onView }) {
    const columns = [
        {
            name: 'INS_NOMBRE',
            label: "Insumo",
        },
        {
            name: 'MOI_ENTRADAS_TOTALES',
            label: "Entradas totales",
        },
        {
            name: 'MOI_SALIDAS_TOTALES',
            label: "Salidas totales",
        },
        {
            name: 'MOI_EXISTENCIAS',
            label: "Existencias",
        },
        {
            name: 'actions',
            label: "Acciones",
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
                title={"Tabla de movimientos"}
                data={data}
                columns={columns}
                options={options}
            />
        </div>
    )
}

export default MovimientosTable