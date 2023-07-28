import { Field } from 'formik'
import { useState, useEffect } from 'react'

function SelectLaboratorio() {
    const apiUrl = process.env.NEXT_PUBLIC_API_URL
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
        <Field className="form-control" name="laboratorioID" as="select">
            <option value={0}>Seleccione un laboratorio</option>
            {
                data.map((value) => (
                    <option key={value.LAB_ID} value={value.LAB_ID}>{value.LAB_NOMBRE}</option>
                ))
            }
        </Field>
    )
}

export default SelectLaboratorio