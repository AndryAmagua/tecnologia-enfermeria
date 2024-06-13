'use client'
import CategoriaModal from '../modals/CategoriaModal'
import CategoriaTable from '@/components/tables/CategoriaTable'
import Alert from '@/components/Alert'
import { useState, useEffect } from 'react'

function AcordeonCategorias() {
    const [formData, setFormData] = useState({})
    const [data, setData] = useState([])
    const [alertMessage, setAlertMessage] = useState({ estado: false, clase: "", msg: "" })
    const [modalCreate, setModalCreate] = useState(false)
    const [modalEdit, setModalEdit] = useState(false)

    async function getCategorias() {
        try {
            const response = await fetch('api/equipo/categoria')
            const result = await response.json()
            setData(result.data)
        } catch (error) {
            setData([])
        }
    }

    async function createCategoria(values) {
        try {
            const response = await fetch('api/equipo/categoria', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(values)
            })
            const result = await response.json()
            setModalCreate(false)
            if (result.estado) {
                setAlertMessage({ estado: true, clase: "alert alert-dismissible alert-success", msg: result.msg })
            } else {
                setAlertMessage({ estado: true, clase: "alert alert-dismissible alert-danger", msg: result.msg })
            }
            getCategorias()
        } catch (error) {

        }
    }

    async function editCategoria(values) {
        try {
            const response = await fetch('api/equipo/categoria', {
                method: 'PUT',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(values)
            })
            const result = await response.json()
            setModalEdit(false)
            if (result.estado) {
                setAlertMessage({ estado: true, clase: "alert alert-dismissible alert-success", msg: result.msg })
            } else {
                setAlertMessage({ estado: true, clase: "alert alert-dismissible alert-danger", msg: result.msg })
            }
            getCategorias()
        } catch (error) {
            console.log(error)
        }

    }

    async function deleteCategoria(id) {
        try {
            if (confirm("¿Está seguro de que desea eliminar?") == true) {
                const response = await fetch('api/equipo/categoria/' + id, {
                    method: 'DELETE'
                })
                const result = await response.json()
                if (result.estado) {
                    setAlertMessage({ estado: true, clase: "alert alert-dismissible alert-success", msg: result.msg })
                } else {
                    setAlertMessage({ estado: true, clase: "alert alert-dismissible alert-danger", msg: result.msg })
                }
                getCategorias()
            }
        } catch (error) {
            console.log(error)
        }
    }

    const openEdit = (row) => {
        setFormData(row)
        setModalEdit(true)
    }

    useEffect(() => {
        getCategorias()
    }, [])

    return (
        <>
            {
                alertMessage.estado &&
                <Alert clase={alertMessage.clase} mensaje={alertMessage.msg} >
                    <button type="button" className="btn-close" onClick={() => setAlertMessage({ ...alertMessage, estado: false })}></button>
                </Alert>
            }
            {
                modalCreate &&
                <CategoriaModal data={[]} showModal={setModalCreate} funcion={createCategoria} />
            }
            {
                modalEdit &&
                <CategoriaModal data={formData} showModal={setModalEdit} funcion={editCategoria} />
            }
            <div className="accordion" id="accordionExample">
                <div className="accordion-item">
                    <h2 className="accordion-header" id="headingOne">
                        <button className="accordion-button collapsed" type="button" data-bs-toggle="collapse" data-bs-target="#collapseOne" aria-expanded="false" aria-controls="collapseOne">
                            Tipos de equipo biomedico
                        </button>
                    </h2>
                    <div id="collapseOne" className="accordion-collapse collapse" aria-labelledby="headingOne" data-bs-parent="#accordionExample" style={{}}>
                        <div className="accordion-body">
                            <div className="row">
                                <div className="col-sm-2">
                                    <button type="button" className="btn btn-primary m-3" onClick={() => setModalCreate(true)}>
                                        Agregar
                                    </button>
                                </div>
                                <div className="col-sm-10">
                                    <CategoriaTable data={data} onEdit={openEdit} onDelete={deleteCategoria} />
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </>
    )
}

export default AcordeonCategorias