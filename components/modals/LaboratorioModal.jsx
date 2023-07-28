"use client"
import { Formik, Form, Field, ErrorMessage } from 'formik'

function LaboratorioModal({ data, showModal, funcion }) {
    return (
        <div className="modal" style={{ display: 'block', backgroundColor: 'rgba(64, 64, 64, 0.5)' }}>
            <div className="modal-dialog">
                <div className="modal-content">
                    <div className="modal-header">
                        <h5 className="modal-title">Fomulario laboratorio</h5>
                        <button className="btn-close" onClick={() => showModal(false)}>
                            <span aria-hidden={true}></span>
                        </button>
                    </div>
                    <div className="modal-body">
                        <fieldset>
                            <Formik
                                initialValues={{ id: data.LAB_ID || 0, nombre: data.LAB_NOMBRE || "", capacidad: data.LAB_CAPACIDAD || 0, tipoEspacio: data.LAB_TIPO || "" }}
                                validate={values => {
                                    const errors = {};
                                    if (!values.nombre) {
                                        errors.nombre = 'Nombre de laboratorio requerido';
                                    }
                                    if (values.capacidad < 1) {
                                        errors.capacidad = 'La capacidad no puede ser 0'
                                    }
                                    if (!values.tipoEspacio) {
                                        errors.tipoEspacio = 'Seleccione una de las opciones'
                                    }
                                    return errors;
                                }}
                                onSubmit={(values, { setSubmitting }) => {
                                    setTimeout(() => {
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
                                                <Field name="tipoEspacio" type="radio" value={"laboratorio"} />
                                                <label className="form-check-label mx-2" for="optionsRadios1">
                                                    Área de práctica
                                                </label>
                                            </div>
                                            <div className="form-check">
                                                <Field name="tipoEspacio" type="radio" value={"almacen"} />
                                                <label className="form-check-label mx-2" for="optionsRadios1">
                                                    Espacio de almacenamiento
                                                </label>
                                            </div>
                                            <ErrorMessage className='text-danger' name="tipoEspacio" component="div" />
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