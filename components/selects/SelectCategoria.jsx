import { Field } from 'formik'
import { useState, useEffect } from 'react'

function SelectCategoria() {
    const apiUrl = process.env.NEXT_PUBLIC_API_URL
    const [data, setData] = useState([])

    async function getCategorias() {
        try {
            const response = await fetch('api/equipo/categoria')
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
        <Field className="form-control" name="categoriaID" as="select">
            <option value={0}>Seleccione una categoría</option>
            {
                data.map((value) => (
                    <option key={value.TIP_ID} value={value.TIP_ID}>{value.TIP_NOMBRE}</option>
                ))
            }
        </Field>
    )
}

export default SelectCategoria