'use client'
import LaboratorioModal from '@/components/modals/LaboratorioModal'
import LaboratorioTable from '@/components/tables/LaboratorioTable'
import Alert from '@/components/Alert'
import { useState, useEffect } from 'react'

function Laboratorios() {
  const [data, setData] = useState([])
  const [formData, setFormData] = useState({})
  const [alertMessage, setAlertMessage] = useState({ estado: false, clase: "", msg: "" })
  const [modalEdit, setModalEdit] = useState(false)
  const [modalCreate, setModalCreate] = useState(false)
  const apiUrl = process.env.NEXT_PUBLIC_API_URL

  async function getLaboratorios() {
    try {
      const response = await fetch('api/laboratorio')
      const result = await response.json()
      setData(result.data)
    } catch (error) {
      setData([])
    }
  }

  async function createLaboratorio(values) {
    try {
      const response = await fetch('api/laboratorio', {
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
      getLaboratorios()
    } catch (error) {
      console.log(error)
    }

  }

  async function editLaboratorio(values) {
    try {
      const response = await fetch('api/laboratorio', {
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
      getLaboratorios()
    } catch (error) {
      console.log(error)
    }

  }

  async function deleteLaboratorio(id) {
    try {
      if (confirm("¿Está seguro de que desea eliminar?") == true) {
        const response = await fetch('api/laboratorio/' + id, {
          method: 'DELETE'
        })
        const result = await response.json()
        if (result.estado) {
          setAlertMessage({ estado: true, clase: "alert alert-dismissible alert-success", msg: result.msg })
        } else {
          setAlertMessage({ estado: true, clase: "alert alert-dismissible alert-danger", msg: result.msg })
        }
        getLaboratorios()
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
    getLaboratorios()
  }, [])

  return (
    <div className="container-sm p-3">
      <h1 style={{ textAlign: 'center' }}>Laboratorios y espacios</h1>
      {
        alertMessage.estado &&
        <Alert clase={alertMessage.clase} mensaje={alertMessage.msg} >
          <button type="button" className="btn-close" onClick={() => setAlertMessage({ ...alertMessage, estado: false })}></button>
        </Alert>
      }
      {
        modalCreate &&
        <LaboratorioModal data={[]} showModal={setModalCreate} funcion={createLaboratorio} />
      }
      {
        modalEdit &&
        <LaboratorioModal data={formData} showModal={setModalEdit} funcion={editLaboratorio} />
      }
      <button type="button" className="btn btn-primary m-3" onClick={() => setModalCreate(true)}>
        Agregar
      </button>
      <LaboratorioTable data={data} onEdit={openEdit} onDelete={deleteLaboratorio} />
    </div>
  )
}

export default Laboratorios