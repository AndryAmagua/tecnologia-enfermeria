'use client'
import CatedraModal from '../modals/CatedraModal'
import CatedraTable from '../tables/CatedraTable'
import Alert from '@/components/Alert'
import { useState, useEffect } from 'react'

function CardCatedra() {
    const apiUrl = process.env.NEXT_PUBLIC_API_URL
    const [formData, setFormData] = useState({})
    const [data, setData] = useState([])
    const [alertMessage, setAlertMessage] = useState({ estado: false, clase: "", msg: "" })
    const [modalCreate, setModalCreate] = useState(false)
    const [modalEdit, setModalEdit] = useState(false)

    async function getCatedras() {
        try {
            const response = await fetch('api/parametros/catedra')
            const result = await response.json()
            setData(result.data)
        } catch (error) {
            setData([])
        }
    }

    async function createCatedra(value) {
        try {
            const response = await fetch('api/parametros/catedra', {
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
            getCatedras()
        } catch (error) {

        }
    }

    async function editCatedra(values) {
        try {
            const response = await fetch('api/parametros/catedra', {
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
            getCatedras()
        } catch (error) {
            console.log(error)
        }

    }

    async function deleteCatedra(id) {
        try {
            if (confirm("¿Está seguro de que desea eliminar?") == true) {
                const response = await fetch('api/parametros/catedra/' + id, {
                    method: 'DELETE'
                })
                const result = await response.json()
                if (result.estado) {
                    setAlertMessage({ estado: true, clase: "alert alert-dismissible alert-success", msg: result.msg })
                } else {
                    setAlertMessage({ estado: true, clase: "alert alert-dismissible alert-danger", msg: result.msg })
                }
                getCatedras()
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
        getCatedras()
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
                <CatedraModal data={[]} showModal={setModalCreate} funcion={createCatedra} />
            }
            {
                modalEdit &&
                <CatedraModal data={formData} showModal={setModalEdit} funcion={editCatedra} />
            }
            <div className="card text-white bg-primary mb-3">
                <div className="card-header">
                    <button type="button" className="btn btn-light btn-sm my-3" onClick={() => setModalCreate(true)}>
                        Agregar
                    </button>
                </div>
                <div className="card-body">
                    <CatedraTable data={data} onEdit={openEdit} onDelete={deleteCatedra} />
                </div>
            </div>
        </>
    )
}

export default CardCatedra