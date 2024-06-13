import { Field } from 'formik'
import { useState, useEffect } from 'react'

function SelectLaboratorio() {
    const [data, setData] = useState([])

    async function getLaboratorios() {
        try {
            const response = await fetch('api/laboratorio')
            const result = await response.json()
            setData(result.data)
        } catch (error) {
            setData({ data: null })
        }
    }

    useEffect(() => {
        getLaboratorios()
    }, [])

    return (
        <Field className="form-control" name="area_id" as="select">
            <option value={0}>Seleccione un espacio de almacenamiento</option>
            {
                data.map((value) => (
                    <option key={value.area_id} value={value.area_id}>{value.nombre}</option>
                ))
            }
        </Field>
    )
}

export default SelectLaboratorio