import { Field } from 'formik'
import { useState, useEffect } from 'react'

function SelectInsumo() {
    const apiUrl = process.env.NEXT_PUBLIC_API_URL
    const [data, setData] = useState([])

    async function getInsumos() {
        try {
            const response = await fetch('api/insumo')
            const result = await response.json()
            setData(result.data)
        } catch (error) {
            setData({ data: null })
        }
    }

    useEffect(() => {
        getInsumos()
    }, [])

    return (
        <Field className="form-control" name="insumo_id" as="select">
            <option value={0}>Seleccione un insumo</option>
            {
                data.map((value) => (
                    <option key={value.insumo_id} value={value.insumo_id}>{value.nombre}</option>
                ))
            }
        </Field>
    )
}

export default SelectInsumo