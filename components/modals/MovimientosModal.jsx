'use client'
import React, { useEffect, useState } from 'react'

function MovimientosModal({ data, showModal }) {
    const [entradas, setEntradas] = useState([])
    const [salidas, setSalidas] = useState([])

    async function getMovimientos() {
        try {
            const response = await fetch('api/movimientos/' + data.insumo_id)
            const result = await response.json()
            setEntradas(result.data.entradas)
            setSalidas(result.data.salidas)
        } catch (error) {
            console.log(error)
        }
    }

    useEffect(() => {
        getMovimientos()
    }, [])

    return (
        <div className="modal" style={{ display: 'block', backgroundColor: 'rgba(64, 64, 64, 0.5)' }}>
            <div className="modal-dialog">
                <div className="modal-content">
                    <div className="modal-header">
                        <h5 className="modal-title">Lista de movimientos</h5>
                        <button className="btn-close" onClick={() => showModal(false)}>
                            <span aria-hidden={true}></span>
                        </button>
                    </div>
                    <div className="modal-body">
                        <div className="row">
                            <div className="col-sm-6">
                                <ul className="list-group">
                                    {
                                        entradas.map((value) => (
                                            <li key={value.entrada_id + '/' + value.fecha} className="list-group-item list-group-item-success d-flex justify-content-between align-items-center">
                                                {value.fecha}
                                                <span className="badge bg-primary rounded-pill">{value.cantidad}</span>
                                            </li>
                                        ))
                                    }
                                </ul>
                            </div>
                            <div className="col-sm-6">
                                <ul className="list-group">
                                    {
                                        salidas.map((value) => (
                                            <li key={value.salida_id + '/' + value.fecha} className="list-group-item list-group-item-danger d-inline-flex justify-content-around align-items-center">
                                                {value.fecha}
                                                <span className="badge bg-primary rounded-pill">{value.cantidad}</span>
                                            </li>
                                        ))
                                    }
                                </ul>
                            </div>
                        </div>


                    </div>
                </div>
            </div>
        </div>
    )
}

export default MovimientosModal