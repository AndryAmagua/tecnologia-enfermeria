import { Field } from 'formik'
import { useState, useEffect } from 'react'

function SelectCarrera() {
    const [data, setData] = useState([])

    async function getCategorias() {
        try {
            const response = await fetch('api/parametros/carrera')
            const result = await response.json()
            setData(result.data)
        } catch (error) {
            setData([])
        }
    }

    useEffect(() => {
        getCategorias()
    }, [])


    return (
        <Field className="form-control" name="carrera_id" as="select">
            <option value={0}>Seleccione una carrera</option>
            {
                data.map((value) => (
                    <option key={value.carrera_id} value={value.carrera_id}>{value.nombre}</option>
                ))
            }
        </Field>
    )
}

export default SelectCarrera