'use client'
import PeriodoModal from '../modals/PeriodoModal'
import PeriodoTable from '../tables/PeriodoTable'
import Alert from '@/components/Alert'
import { useState, useEffect } from 'react'

function CardPeriodo() {
    const apiUrl = process.env.NEXT_PUBLIC_API_URL
    const [formData, setFormData] = useState({})
    const [data, setData] = useState([])
    const [alertMessage, setAlertMessage] = useState({ estado: false, clase: "", msg: "" })
    const [modalCreate, setModalCreate] = useState(false)
    const [modalEdit, setModalEdit] = useState(false)

    async function getPeriodos() {
        try {
            const response = await fetch('api/parametros/periodo')
            const result = await response.json()
            setData(result.data)
        } catch (error) {
            setData([])
        }
    }

    async function createPeriodo(values) {
        try {
            console.log(values)
            const response = await fetch('api/parametros/periodo', {
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
            getPeriodos()
        } catch (error) {

        }
    }

    async function editPeriodo(values) {
        try {
            const response = await fetch('api/parametros/periodo', {
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
            getPeriodos()
        } catch (error) {
            console.log(error)
        }

    }

    async function deletePeriodo(id) {
        try {
            if (confirm("¿Está seguro de que desea eliminar?") == true) {
                const response = await fetch('api/parametros/periodo/' + id, {
                    method: 'DELETE'
                })
                const result = await response.json()
                if (result.estado) {
                    setAlertMessage({ estado: true, clase: "alert alert-dismissible alert-success", msg: result.msg })
                } else {
                    setAlertMessage({ estado: true, clase: "alert alert-dismissible alert-danger", msg: result.msg })
                }
                getPeriodos()
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
        getPeriodos()
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
                <PeriodoModal data={[]} showModal={setModalCreate} funcion={createPeriodo} />
            }
            {
                modalEdit &&
                <PeriodoModal data={formData} showModal={setModalEdit} funcion={editPeriodo} />
            }
            <div className="card text-white bg-primary mb-3">
                <div className="card-header">
                    <button type="button" className="btn btn-light btn-sm my-3" onClick={() => setModalCreate(true)}>
                        Agregar
                    </button>
                </div>
                <div className="card-body">
                    <PeriodoTable data={data} onEdit={openEdit} onDelete={deletePeriodo} />
                </div>
            </div>
        </>
    )
}

export default CardPeriodo