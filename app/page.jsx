'use client'
import MovimientosTable from '@/components/tables/MovimientosTable'
import MovimientosModal from '@/components/modals/MovimientosModal'
import AcordeonMoviminetos from '@/components/acordeones/AcordeonMoviminetos'
import Alert from '@/components/Alert'
import { useState, useEffect } from 'react'

export default function IndexPage() {
  const [data, setData] = useState([])
  const [alertMessage, setAlertMessage] = useState({ estado: false, clase: "", msg: "" })
  const [showModal, setShowModal] = useState(false)
  const [formData, setFormData] = useState({})

  async function getMovimientos() {
    try {
      const response = await fetch('api/movimientos')
      const result = await response.json()
      setData(result.data)
    } catch (error) {
      setData([])
    }
  }

  async function createEntrada(entrada) {
    try {
      const response = await fetch('api/movimientos/entradas', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ insumoID: entrada.insumoID, fecha: entrada.fecha, cantidad: entrada.cantidad })
      })
      const result = await response.json()
      if (result.estado) {
        setAlertMessage({ estado: true, clase: "alert alert-dismissible alert-success", msg: result.msg })
      } else {
        setAlertMessage({ estado: true, clase: "alert alert-dismissible alert-danger", msg: result.msg })
      }
      getMovimientos()
    } catch (error) {
      console.log(error)
    }
  }

  async function createSalida(salida) {
    try {
      const response = await fetch('api/movimientos/salidas', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ insumoID: salida.insumoID, fecha: salida.fecha, cantidad: salida.cantidad })
      })
      const result = await response.json()
      if (result.estado) {
        setAlertMessage({ estado: true, clase: "alert alert-dismissible alert-success", msg: result.msg })
      } else {
        setAlertMessage({ estado: true, clase: "alert alert-dismissible alert-danger", msg: result.msg })
      }
      getMovimientos()
    } catch (error) {
      console.log(error)
    }
  }


  const openView = async (row) => {
    setFormData(row)
    setShowModal(true)
  }

  useEffect(() => {
    getMovimientos()
  }, [])

  return (
    <div className="container-sm p-3">
      <h1 style={{ textAlign: 'center' }}>Movimientos de insumos</h1>
      {
        alertMessage.estado &&
        <Alert clase={alertMessage.clase} mensaje={alertMessage.msg} >
          <button type="button" className="btn-close" onClick={() => setAlertMessage({ ...alertMessage, estado: false })}></button>
        </Alert>
      }
      {
        showModal &&
        <MovimientosModal data={formData} showModal={setShowModal} />
      }
      <AcordeonMoviminetos setEntrada={createEntrada} setSalida={createSalida} />
      <MovimientosTable data={data} onView={openView} />
    </div>
  )
}
