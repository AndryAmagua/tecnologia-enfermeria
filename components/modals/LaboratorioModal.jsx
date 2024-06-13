"use client"
import { Formik, Form, Field, ErrorMessage } from 'formik'
import * as Yup from 'yup'

function LaboratorioModal({ data, showModal, funcion }) {
    const validationSchema = Yup.object({
        nombre: Yup.string().required('Campo obligatorio'),
        capacidad: Yup.number().min(1, 'Campo obligatorio'),
        tipo: Yup.string().required('Campo obligatorio')
    })

    return (
        <div className="modal" style={{ display: 'block', backgroundColor: 'rgba(64, 64, 64, 0.5)' }}>
            <div className="modal-dialog">
                <div className="modal-content">
                    <div className="modal-header">
                        <h5 className="modal-title">Fomulario de laboratorios</h5>
                        <button className="btn-close" onClick={() => showModal(false)}>
                            <span aria-hidden={true}></span>
                        </button>
                    </div>
                    <div className="modal-body">
                        <fieldset>
                            <Formik
                                initialValues={{ area_id: data.area_id || 0, nombre: data.nombre || "", capacidad: data.capacidad || 0, tipo: data.tipo || "" }}
                                validationSchema={validationSchema}
                                onSubmit={(values, { setSubmitting }) => {
                                    setTimeout(() => {
                                        funcion(values)
                                        setSubmitting(false)
                                    }, 2000)
                                }}
                            >
                                {({ isSubmitting }) => (
                                    <Form>
                                        {/* <div className="form-group">
                                            <Field className="form-control" type="text" name="id" disabled={true} />
                                        </div> */}
                                        <div className="form-group">
                                            <label className="col-form-label mt-4" >Nombre</label>
                                            <Field className="form-control" type="text" name="nombre" />
                                            <ErrorMessage className='text-danger' name="nombre" component="div" />
                                        </div>
                                        <div className="form-group">
                                            <label className="col-form-label mt-4" >Capacidad</label>
                                            <Field className="form-control" type="number" min={0} name="capacidad" />
                                            <ErrorMessage className='text-danger' name="capacidad" component="div" />
                                        </div>
                                        <div className="form-group">
                                            <label className="col-form-label mt-4" >Uso del área registrada</label>
                                            <div className="form-check">
                                                <Field name="tipo" type="radio" value={"laboratorio"} />
                                                <label className="form-check-label mx-2" for="optionsRadios1">
                                                    Área de práctica
                                                </label>
                                            </div>
                                            <div className="form-check">
                                                <Field name="tipo" type="radio" value={"almacen"} />
                                                <label className="form-check-label mx-2" for="optionsRadios1">
                                                    Espacio de almacenamiento
                                                </label>
                                            </div>
                                            <ErrorMessage className='text-danger' name="tipo" component="div" />
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

export default LaboratorioModal