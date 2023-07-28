'use client'
import ParaleloModal from '../modals/ParaleloModal'
import ParaleloTable from '../tables/ParaleloTable'
import Alert from '@/components/Alert'
import { useState, useEffect } from 'react'

function CardParalelo() {
    const apiUrl = process.env.NEXT_PUBLIC_API_URL
    const [formData, setFormData] = useState({})
    const [data, setData] = useState([])
    const [alertMessage, setAlertMessage] = useState({ estado: false, clase: "", msg: "" })
    const [modalCreate, setModalCreate] = useState(false)
    const [modalEdit, setModalEdit] = useState(false)

    async function getParalelos() {
        try {
            const response = await fetch('api/parametros/paralelo')
            const result = await response.json()
            setData(result.data)
        } catch (error) {
            setData([])
        }
    }

    async function createParalelo(value) {
        try {
            const response = await fetch('api/parametros/paralelo', {
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
            getParalelos()
        } catch (error) {

        }
    }

    async function editParalelo(values) {
        try {
            const response = await fetch('api/parametros/paralelo', {
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
            getParalelos()
        } catch (error) {
            console.log(error)
        }

    }

    async function deleteParalelo(id) {
        try {
            if (confirm("¿Está seguro de que desea eliminar?") == true) {
                const response = await fetch('api/parametros/paralelo/' + id, {
                    method: 'DELETE'
                })
                const result = await response.json()
                if (result.estado) {
                    setAlertMessage({ estado: true, clase: "alert alert-dismissible alert-success", msg: result.msg })
                } else {
                    setAlertMessage({ estado: true, clase: "alert alert-dismissible alert-danger", msg: result.msg })
                }
                getParalelos()
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
        getParalelos()
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
                <ParaleloModal data={[]} showModal={setModalCreate} funcion={createParalelo} />
            }
            {
                modalEdit &&
                <ParaleloModal data={formData} showModal={setModalEdit} funcion={editParalelo} />
            }
            <div className="card text-white bg-primary mb-3">
                <div className="card-header">PARALELOS</div>
                <div className="card-body">
                    <button type="button" className="btn btn-light btn-sm mb-3" onClick={() => setModalCreate(true)}>
                        Agregar
                    </button>
                    <ParaleloTable data={data} onEdit={openEdit} onDelete={deleteParalelo} />
                </div>
            </div>
        </>
    )
}

export default CardParalelo