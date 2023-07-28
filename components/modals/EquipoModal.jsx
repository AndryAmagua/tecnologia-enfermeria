"use client"
import SelectCategoria from '../selects/SelectCategoria'
import SelectLaboratorio from '../selects/SelectLaboratorio';
import { Formik, Form, Field, ErrorMessage } from 'formik'
import * as Yup from 'yup'

function EquipoModal({ data, showModal, funcion }) {
    const validationSchema = Yup.object({
        codigo: Yup.number().typeError('Codigo SAP solo debe contener numeros'),
        nombre: Yup.string().required('El nombre de equipo es requerido'),
        cantidad: Yup.number().required('Cantidad de piezas es requerido').min(1, 'Cantidad minima de piezas es 1'),
        categoriaID: Yup.number().min(1, 'Seleccione una categoría'),
        laboratorioID: Yup.number().min(1, 'Selecione una ubicación de almacenamiento')
    })

    return (
        <div className="modal" style={{ display: 'block', backgroundColor: 'rgba(64, 64, 64, 0.5)' }}>
            <div className="modal-dialog">
                <div className="modal-content">
                    <div className="modal-header">
                        <h5 className="modal-title">Fomulario equipos</h5>
                        <button className="btn-close" onClick={() => showModal(false)}>
                            <span aria-hidden={true}></span>
                        </button>
                    </div>
                    <div className="modal-body">
                        <fieldset>
                            <Formik
                                initialValues={{ id: data.EQU_ID || 0, codigo: data.EQU_CODIGO_SAP || "", nombre: data.EQU_NOMBRE || "", cantidad: data.EQU_CANTIDAD_PIEZAS || 0, especificacion: data.EQU_ESPECIFICACIONES || "", marca: data.EQU_MARCA || "", mantenimiento: data.EQU_FECHA_MANTENIMIENTO || new Date().toISOString().substr(0, 10), categoriaID: data.TIP_ID || 0, laboratorioID: data.LAB_ID || 0 }}
                                validationSchema={validationSchema}
                                onSubmit={(values, { setSubmitting }) => {
                                    setTimeout(() => {
                                        values.mantenimiento = values.mantenimiento.substr(0, 10)
                                        funcion(values)
                                        setSubmitting(false)
                                    }, 2000)
                                }}
                            >
                                {({ isSubmitting }) => (
                                    <Form>
                                        <div className="form-group">
                                            <Field className="form-control" type="text" name="id" disabled={true} />
                                        </div>
                                        <div className="form-group">
                                            <label className="col-form-label mt-4" >Codigo</label>
                                            <Field className="form-control" type="text" name="codigo" />
                                            <ErrorMessage className='text-danger' name="codigo" component="div" />
                                        </div>
                                        <div className="form-group">
                                            <label className="col-form-label mt-4" >Nombre</label>
                                            <Field className="form-control" type="text" name="nombre" />
                                            <ErrorMessage className='text-danger' name="nombre" component="div" />
                                        </div>
                                        <div className="form-group">
                                            <label className="col-form-label mt-4" >Cantidad de piezas</label>
                                            <Field className="form-control" type="number" min={0} name="cantidad" />
                                            <ErrorMessage className='text-danger' name="cantidad" component="div" />
                                        </div>
                                        <div className="form-group">
                                            <label className="col-form-label mt-4" >Especificaciones</label>
                                            <Field as="textarea" name="especificacion" rows="5" cols="50" />
                                            <ErrorMessage className='text-danger' name="especificacion" component="div" />
                                        </div>
                                        <div className="form-group">
                                            <label className="col-form-label mt-4" >Marca</label>
                                            <Field className="form-control" type="text" name="marca" />
                                            <ErrorMessage className='text-danger' name="marca" component="div" />
                                        </div>
                                        <div className="form-group">
                                            <label className="col-form-label mt-4" >Fecha de mantenimineto</label>
                                            <Field className="form-control" type="date" name="mantenimiento" />
                                            <ErrorMessage className='text-danger' name="mantenimiento" component="div" />
                                        </div>
                                        <div className="form-group">
                                            <label className="col-form-label mt-4" >Categoría</label>
                                            <SelectCategoria />
                                            <ErrorMessage className='text-danger' name="categoriaID" component="div" />
                                        </div>
                                        <div className="form-group">
                                            <label className="col-form-label mt-4" >Ubicación</label>
                                            <SelectLaboratorio />
                                            <ErrorMessage className='text-danger' name="laboratorioID" component="div" />
                                        </div>
                                        <div className="form-group mt-4">
                                            <button className="btn btn-primary" type="submit" disabled={isSubmitting}>
                                                Guardar
                                            </button>
                                        </div>
                                    </Form>
                                )}
                            </Formik>
                        </fieldset>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default EquipoModal