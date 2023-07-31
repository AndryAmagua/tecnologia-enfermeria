'use client'
import ReservasExternasTable from '@/components/tables/ReservasExternasTable'
import ReservaExternaModal from '@/components/modals/ReservaExternaModal'
import Alert from '@/components/Alert'
import { useState, useEffect } from 'react'

function ReservasExternas() {
    const [data, setData] = useState([])
    const [showModal, setShowModal] = useState(false)
    const [formData, setFormData] = useState({})
    const [alertMessage, setAlertMessage] = useState({ estado: false, clase: "", msg: "" })

    async function getReservas() {
        try {
            const response = await fetch('api/reserva/externa')
            const result = await response.json()
            setData(result.data)
        } catch (error) {
            setData([])
        }
    }

    async function editReserva(values) {
        try {
            const response = await fetch('api/reserva/externa', {
                method: 'PUT',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(values)
            })
            const result = await response.json()
            setShowModal(false)
            if (result.estado) {
                setAlertMessage({ estado: true, clase: "alert alert-dismissible alert-success", msg: result.msg })
            } else {
                setAlertMessage({ estado: true, clase: "alert alert-dismissible alert-danger", msg: result.msg })
            }
            getReservas()
        } catch (error) {
            console.log(error)
        }

    }

    const openEdit = async (row) => {
        setFormData(row)
        setShowModal(true)
    }

    useEffect(() => {
        getReservas()
    }, [])

    return (
        <div className="container-sm p-3">
            <h1 style={{ textAlign: 'center' }}>Administración de solicitudes externas</h1>
            {
                alertMessage.estado &&
                <Alert clase={alertMessage.clase} mensaje={alertMessage.msg} >
                    <button type="button" className="btn-close" onClick={() => setAlertMessage({ ...alertMessage, estado: false })}></button>
                </Alert>
            }
            {
                showModal &&
                <ReservaExternaModal data={formData} showModal={setShowModal} funcion={editReserva} />
            }

            <ReservasExternasTable data={data} onEdit={openEdit} />
        </div>
    )
}

export default ReservasExternas