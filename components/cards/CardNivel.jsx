'use client'
import NivelModal from '../modals/NivelModal'
import NivelTable from '../tables/NivelTable'
import Alert from '@/components/Alert'
import { useState, useEffect } from 'react'

function CardNivel() {
    const apiUrl = process.env.NEXT_PUBLIC_API_URL
    const [formData, setFormData] = useState({})
    const [data, setData] = useState([])
    const [alertMessage, setAlertMessage] = useState({ estado: false, clase: "", msg: "" })
    const [modalCreate, setModalCreate] = useState(false)
    const [modalEdit, setModalEdit] = useState(false)

    async function getNiveles() {
        try {
            const response = await fetch('api/parametros/nivel')
            const result = await response.json()
            setData(result.data)
        } catch (error) {
            setData([])
        }
    }

    async function createNivel(value) {
        try {
            const response = await fetch('api/parametros/nivel', {
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
            getNiveles()
        } catch (error) {

        }
    }

    async function editNivel(values) {
        try {
            const response = await fetch('api/parametros/nivel', {
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
            getNiveles()
        } catch (error) {
            console.log(error)
        }

    }

    async function deleteNivel(id) {
        try {
            if (confirm("¿Está seguro de que desea eliminar?") == true) {
                const response = await fetch('api/parametros/nivel/' + id, {
                    method: 'DELETE'
                })
                const result = await response.json()
                if (result.estado) {
                    setAlertMessage({ estado: true, clase: "alert alert-dismissible alert-success", msg: result.msg })
                } else {
                    setAlertMessage({ estado: true, clase: "alert alert-dismissible alert-danger", msg: result.msg })
                }
                getNiveles()
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
        getNiveles()
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
                <NivelModal data={[]} showModal={setModalCreate} funcion={createNivel} />
            }
            {
                modalEdit &&
                <NivelModal data={formData} showModal={setModalEdit} funcion={editNivel} />
            }
            <div className="card text-white bg-primary mb-3">
                <div className="card-header">
                    <button type="button" className="btn btn-light btn-sm my-3" onClick={() => setModalCreate(true)}>
                        Agregar
                    </button>
                </div>
                <div className="card-body">
                    <NivelTable data={data} onEdit={openEdit} onDelete={deleteNivel} />
                </div>
            </div>
        </>
    )
}

export default CardNivel