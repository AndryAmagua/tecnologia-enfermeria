'use client'
import AcordeonCategorias from '@/components/acordeones/AcordeonCategorias'
import EquipoTable from '@/components/tables/EquipoTable'
import EquipoModal from '@/components/modals/EquipoModal'
import Alert from '@/components/Alert'
import { useState, useEffect } from 'react'

function Equipos() {
    const apiUrl = process.env.NEXT_PUBLIC_API_URL
    const [data, setData] = useState([])
    const [formData, setFormData] = useState({})
    const [alertMessage, setAlertMessage] = useState({ estado: false, clase: "", msg: "" })
    const [modalCreate, setModalCreate] = useState(false)
    const [modalEdit, setModalEdit] = useState(false)

    async function getEquipos() {
        try {
            const response = await fetch('api/equipo')
            const result = await response.json()
            setData(result.data)
        } catch (error) {
            setData([])
        }
    }

    async function createEquipo(equipo) {
        try {
            const response = await fetch('api/equipo', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({
                    codigo: equipo.codigo, nombre: equipo.nombre, cantidad: equipo.cantidad, especificacion: equipo.especificacion, marca: equipo.marca, mantenimiento: equipo.mantenimiento, categoriaID: equipo.categoriaID, laboratorioID: equipo.laboratorioID
                })
            })
            const result = await response.json()
            setModalCreate(false)
            if (result.estado) {
                setAlertMessage({ estado: true, clase: "alert alert-dismissible alert-success", msg: result.msg })
            } else {
                setAlertMessage({ estado: true, clase: "alert alert-dismissible alert-danger", msg: result.msg })
            }
            getEquipos()
        } catch (error) {

        }
    }

    async function editEquipo(equipo) {
        try {
            const response = await fetch('api/equipo', {
                method: 'PUT',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({
                    id: equipo.id, codigo: equipo.codigo, nombre: equipo.nombre, cantidad: equipo.cantidad, especificacion: equipo.especificacion, marca: equipo.marca, mantenimiento: equipo.mantenimiento, categoriaID: equipo.categoriaID, laboratorioID: equipo.laboratorioID
                })
            })
            const result = await response.json()
            setModalEdit(false)
            if (result.estado) {
                setAlertMessage({ estado: true, clase: "alert alert-dismissible alert-success", msg: result.msg })
            } else {
                setAlertMessage({ estado: true, clase: "alert alert-dismissible alert-danger", msg: result.msg })
            }
            getEquipos()
        } catch (error) {
            console.log(error)
        }

    }

    async function deleteEquipo(id) {
        try {
            if (confirm("¿Está seguro de que desea eliminar?") == true) {
                const response = await fetch('api/equipo/' + id, {
                    method: 'DELETE'
                })
                const result = await response.json()
                if (result.estado) {
                    setAlertMessage({ estado: true, clase: "alert alert-dismissible alert-success", msg: result.msg })
                } else {
                    setAlertMessage({ estado: true, clase: "alert alert-dismissible alert-danger", msg: result.msg })
                }
                getEquipos()
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
        getEquipos()
    }, [])

    return (
        <div className="container-sm p-3">
            <h1 style={{ textAlign: 'center' }}>Administración de equipos biomédicos</h1>
            <AcordeonCategorias />
            {
                modalCreate &&
                <EquipoModal data={[]} showModal={setModalCreate} funcion={createEquipo} />
            }
            {
                modalEdit &&
                <EquipoModal data={formData} showModal={setModalEdit} funcion={editEquipo} />
            }

            <button type="button" className="btn btn-primary mt-5" onClick={() => setModalCreate(true)}>
                Agregar
            </button>
            {
                alertMessage.estado &&
                <Alert clase={alertMessage.clase} mensaje={alertMessage.msg} >
                    <button type="button" className="btn-close" onClick={() => setAlertMessage({ ...alertMessage, estado: false })}></button>
                </Alert>
            }
            <EquipoTable data={data} onEdit={openEdit} onDelete={deleteEquipo} />
        </div>
    )
}

export default Equipos