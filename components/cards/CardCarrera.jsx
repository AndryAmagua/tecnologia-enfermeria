'use client'
import CarreraModal from '../modals/CarreraModal'
import CarreraTable from '../tables/CarreraTable'
import Alert from '@/components/Alert'
import { useState, useEffect } from 'react'

function CardCarrera() {
    const apiUrl = process.env.NEXT_PUBLIC_API_URL
    const [formData, setFormData] = useState({})
    const [data, setData] = useState([])
    const [alertMessage, setAlertMessage] = useState({ estado: false, clase: "", msg: "" })
    const [modalCreate, setModalCreate] = useState(false)
    const [modalEdit, setModalEdit] = useState(false)

    async function getCarreras() {
        try {
            const response = await fetch('api/parametros/carrera')
            const result = await response.json()
            setData(result.data)
        } catch (error) {
            setData([])
        }
    }

    async function createCarrera(value) {
        try {
            const response = await fetch('api/parametros/carrera', {
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
            getCarreras()
        } catch (error) {

        }
    }

    async function editCarrera(values) {
        try {
            const response = await fetch('api/parametros/carrera', {
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
            getCarreras()
        } catch (error) {
            console.log(error)
        }

    }

    async function deleteCarrera(id) {
        try {
            if (confirm("¿Está seguro de que desea eliminar?") == true) {
                const response = await fetch('api/parametros/carrera/' + id, {
                    method: 'DELETE'
                })
                const result = await response.json()
                if (result.estado) {
                    setAlertMessage({ estado: true, clase: "alert alert-dismissible alert-success", msg: result.msg })
                } else {
                    setAlertMessage({ estado: true, clase: "alert alert-dismissible alert-danger", msg: result.msg })
                }
                getCarreras()
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
        getCarreras()
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
                <CarreraModal data={[]} showModal={setModalCreate} funcion={createCarrera} />
            }
            {
                modalEdit &&
                <CarreraModal data={formData} showModal={setModalEdit} funcion={editCarrera} />
            }
            <div className="card text-white bg-primary mb-3">
                <div className="card-header">CARRERAS</div>
                <div className="card-body">
                    <button type="button" className="btn btn-light btn-sm mb-3" onClick={() => setModalCreate(true)}>
                        Agregar
                    </button>
                    <CarreraTable data={data} onEdit={openEdit} onDelete={deleteCarrera} />
                </div>
            </div>
        </>
    )
}

export default CardCarrera