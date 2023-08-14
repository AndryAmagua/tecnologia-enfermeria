'use client'
import InsumoTable from "@/components/tables/InsumoTable"
import InsumoModal from "@/components/modals/InsumoModal"
import Alert from '@/components/Alert'
import { useState, useEffect } from 'react'

function Insumos() {
    const [data, setData] = useState([])
    const [formData, setFormData] = useState({})
    const [alertMessage, setAlertMessage] = useState({ estado: false, clase: "", msg: "" })
    const [modalEdit, setModalEdit] = useState(false)
    const [modalCreate, setModalCreate] = useState(false)
    const apiUrl = process.env.NEXT_PUBLIC_API_URL

    async function getInsumos() {
        try {
            const response = await fetch('api/insumo')
            const result = await response.json()
            setData(result.data)
        } catch (error) {
            setData([])
        }
    }

    async function createInsumo(insumo) {
        try {
            const response = await fetch('api/insumo', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ nombre: insumo.nombre, descripcion: insumo.descripcion, unidad: insumo.unidad, presentacion: insumo.presentacion, stockMinimo: insumo.stockMinimo, laboratorioID: insumo.laboratorioID })
            })
            const result = await response.json()
            setModalCreate(false)
            if (result.estado) {
                setAlertMessage({ estado: true, clase: "alert alert-dismissible alert-success", msg: result.msg })
            } else {
                setAlertMessage({ estado: true, clase: "alert alert-dismissible alert-danger", msg: result.msg })
            }
            getInsumos()
        } catch (error) {
            console.log(error)
        }
    }

    async function editInsumo(insumo) {
        try {
            const response = await fetch('api/insumo', {
                method: 'PUT',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ nombre: insumo.nombre, descripcion: insumo.descripcion, unidad: insumo.unidad, presentacion: insumo.presentacion, stockMinimo: insumo.stockMinimo, laboratorioID: insumo.laboratorioID, id: insumo.id })
            })
            const result = await response.json()
            setModalEdit(false)
            if (result.estado) {
                setAlertMessage({ estado: true, clase: "alert alert-dismissible alert-success", msg: result.msg })
            } else {
                setAlertMessage({ estado: true, clase: "alert alert-dismissible alert-danger", msg: result.msg })
            }
            getInsumos()
        } catch (error) {
            console.log(error)
        }

    }

    async function deleteInsumo(id) {
        try {
            if (confirm("¿Está seguro de que desea eliminar?") == true) {
                const response = await fetch('api/insumo/' + id, {
                    method: 'DELETE'
                })
                const result = await response.json()
                if (result.estado) {
                    setAlertMessage({ estado: true, clase: "alert alert-dismissible alert-success", msg: result.msg })
                } else {
                    setAlertMessage({ estado: true, clase: "alert alert-dismissible alert-danger", msg: result.msg })
                }
                getInsumos()
            }
        } catch (error) {
            console.log(error)
        }
    }

    const openEdit = async (row) => {
        setFormData(row)
        setModalEdit(true)
    }

    useEffect(() => {
        getInsumos()
    }, [])

    return (
        <div className="container-sm p-3" style={{marginTop: '70px'}}>
            <h1 style={{ textAlign: 'center' }}>Administración de insumos</h1>
            {
                alertMessage.estado &&
                <Alert clase={alertMessage.clase} mensaje={alertMessage.msg} >
                    <button type="button" className="btn-close" onClick={() => setAlertMessage({ ...alertMessage, estado: false })}></button>
                </Alert>
            }
            {
                modalCreate &&
                <InsumoModal data={[]} showModal={setModalCreate} funcion={createInsumo} />
            }
            {
                modalEdit &&
                <InsumoModal data={formData} showModal={setModalEdit} funcion={editInsumo} />
            }
            <button type="button" className="btn btn-primary m-3" onClick={() => setModalCreate(true)}>
                Agregar
            </button>
            <InsumoTable data={data} onEdit={openEdit} onDelete={deleteInsumo} />
        </div>
    )
}

export default Insumos