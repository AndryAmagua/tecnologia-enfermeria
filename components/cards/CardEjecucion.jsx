'use client'
import EjecucionModal from '../modals/EjecucionModal'
import EjecucionTable from '../tables/EjecucionTable'
import Alert from '@/components/Alert'
import { useState, useEffect } from 'react'

function CardEjecucion() {
    const [formData, setFormData] = useState({})
    const [data, setData] = useState([])
    const [alertMessage, setAlertMessage] = useState({ estado: false, clase: "", msg: "" })
    const [modalCreate, setModalCreate] = useState(false)
    const [modalEdit, setModalEdit] = useState(false)

    async function getEjecuciones() {
        try {
            const response = await fetch('api/parametros/ejecucion')
            const result = await response.json()
            setData(result.data)
        } catch (error) {
            setData([])
        }
    }

    async function createEjecucion(value) {
        try {
            const response = await fetch('api/parametros/ejecucion', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(value)
            })
            const result = await response.json()
            setModalCreate(false)
            if (result.estado) {
                setAlertMessage({ estado: true, clase: "alert alert-dismissible alert-success", msg: result.msg })
            } else {
                setAlertMessage({ estado: true, clase: "alert alert-dismissible alert-danger", msg: result.msg })
            }
            getEjecuciones()
        } catch (error) {

        }
    }

    async function editEjecucion(values) {
        try {
            const response = await fetch('api/parametros/ejecucion', {
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
            getEjecuciones()
        } catch (error) {
            console.log(error)
        }

    }

    async function deleteEjecucion(id) {
        try {
            if (confirm("¿Está seguro de que desea eliminar?") == true) {
                const response = await fetch('api/parametros/ejecucion/' + id, {
                    method: 'DELETE'
                })
                const result = await response.json()
                if (result.estado) {
                    setAlertMessage({ estado: true, clase: "alert alert-dismissible alert-success", msg: result.msg })
                } else {
                    setAlertMessage({ estado: true, clase: "alert alert-dismissible alert-danger", msg: result.msg })
                }
                getEjecuciones()
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
        getEjecuciones()
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
                <EjecucionModal data={[]} showModal={setModalCreate} funcion={createEjecucion} />
            }
            {
                modalEdit &&
                <EjecucionModal data={formData} showModal={setModalEdit} funcion={editEjecucion} />
            }
            <div className="card text-white bg-primary mb-3">
                <div className="card-header">
                    <button type="button" className="btn btn-light btn-sm my-3" onClick={() => setModalCreate(true)}>
                        Agregar
                    </button>
                </div>
                <div className="card-body">
                    <EjecucionTable data={data} onEdit={openEdit} onDelete={deleteEjecucion} />
                </div>
            </div>
        </>
    )
}

export default CardEjecucion