import { Field } from 'formik'
import { useState, useEffect } from 'react'

function SelectCategoria() {
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
        <Field className="form-control" name="categoria_id" as="select">
            <option value={0}>Seleccione una categoría</option>
            {
                data.map((value) => (
                    <option key={value.categoria_id} value={value.categoria_id}>{value.nombre}</option>
                ))
            }
        </Field>
    )
}

export default SelectCategoria