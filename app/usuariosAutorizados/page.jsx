'use client'
import UsuarioModal from '@/components/modals/UsuarioModal'
import UsuarioTable from '@/components/tables/UsuarioTable'
import Alert from '@/components/Alert'
import { useState, useEffect } from 'react'

function UsuariosAutorizados() {
    const [data, setData] = useState([])
    const [formData, setFormData] = useState({})
    const [alertMessage, setAlertMessage] = useState({ estado: false, clase: "", msg: "" })
    const [modalEdit, setModalEdit] = useState(false)
    const [modalCreate, setModalCreate] = useState(false)

    async function getUsuarios() {
        try {
            const response = await fetch('api/usuarioAutorizado')
            const result = await response.json()
            setData(result.data)
        } catch (error) {
            setData([])
        }
    }

    async function createUsuario(values) {
        try {
            const response = await fetch('api/usuarioAutorizado', {
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
            getUsuarios()
        } catch (error) {
            console.log(error)
        }

    }

    async function editUsuario(values) {
        try {
            const response = await fetch('api/usuarioAutorizado', {
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
            getUsuarios()
        } catch (error) {
            console.log(error)
        }

    }

    async function deleteUsuario(id) {
        try {
            if (confirm("¿Está seguro de que desea eliminar?") == true) {
                const response = await fetch('api/usuarioAutorizado/' + id, {
                    method: 'DELETE'
                })
                const result = await response.json()
                if (result.estado) {
                    setAlertMessage({ estado: true, clase: "alert alert-dismissible alert-success", msg: result.msg })
                } else {
                    setAlertMessage({ estado: true, clase: "alert alert-dismissible alert-danger", msg: result.msg })
                }
                getUsuarios()
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
        getUsuarios()
    }, [])

    return (
        <div className="container-sm p-3" style={{ marginTop: '70px' }}>
            <h1 style={{ textAlign: 'center' }}>Usuarios autorizados</h1>
            {
                alertMessage.estado &&
                <Alert clase={alertMessage.clase} mensaje={alertMessage.msg} >
                    <button type="button" className="btn-close" onClick={() => setAlertMessage({ ...alertMessage, estado: false })}></button>
                </Alert>
            }
            {
                modalCreate &&
                <UsuarioModal data={[]} showModal={setModalCreate} funcion={createUsuario} />
            }
            {
                modalEdit &&
                <UsuarioModal data={formData} showModal={setModalEdit} funcion={editUsuario} />
            }
            <button type="button" className="btn btn-primary m-3" onClick={() => setModalCreate(true)}>
                Agregar
            </button>
            <UsuarioTable data={data} onEdit={openEdit} onDelete={deleteUsuario} />
        </div>
    )
}

export default UsuariosAutorizados