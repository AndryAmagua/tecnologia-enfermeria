"use client"
import { Formik, Form, Field, ErrorMessage } from 'formik'

function ReservaExternaModal({ data, showModal, funcion }) {
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
                                initialValues={{ id: data.SOE_ID, observacion: data.SOE_OBSERVACION || "", estado: (data.SOE_ESTADO.toString()) }}
                                validate={values => {
                                    const errors = {}
                                    if (!values.estado) {
                                        errors.estado = 'Seleccione un nuevo estado'
                                    }
                                    if (values.estado == '2') {
                                        if (!values.observacion) {
                                            errors.observacion = 'Añada una breve descripción del motivo de rechazo'
                                        }
                                    }
                                    return errors;
                                }}
                                onSubmit={(values, { setSubmitting }) => {
                                    setTimeout(() => {
                                        if (values.estado == '1') {
                                            values.observacion = ""
                                        }
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

                                        <div className="form-group mt-4">
                                            <fieldset disabled={true}>
                                                <div className="input-group">
                                                    <span className="input-group-text">Solicitante</span>
                                                    <input className="form-control" id="disabledInput" type="text" placeholder={data.PER_NOMBRES + " " + data.PER_APELLIDOS} />
                                                </div>
                                            </fieldset>
                                        </div>
                                        <div className="form-group mt-4">
                                            <fieldset disabled={true}>
                                                <div className="input-group">
                                                    <span className="input-group-text">Institución</span>
                                                    <input className="form-control" id="disabledInput" type="text" placeholder={data.PER_INSTITUCION} />
                                                </div>
                                            </fieldset>
                                        </div>
                                        <div className="form-group mt-4">
                                            <fieldset disabled={true}>
                                                <div className="input-group">
                                                    <span className="input-group-text">N° asistentes</span>
                                                    <input className="form-control" id="disabledInput" type="text" placeholder={data.SOE_ASISTENTES} />
                                                </div>
                                            </fieldset>
                                        </div>
                                        <div className="form-group mt-4">
                                            <fieldset disabled={true}>
                                                <div className="input-group">
                                                    <span className="input-group-text">Periodo académico</span>
                                                    <input className="form-control" id="disabledInput" type="text" placeholder={data.PEA_NOMBRE} />
                                                </div>
                                            </fieldset>
                                        </div>

                                        <div className="form-group">
                                            <label className="col-form-label mt-4" >observacion (solo si la reserva es rechazada)</label>
                                            <Field className="form-control" type="text" name="observacion" />
                                            <ErrorMessage className='text-danger' name="observacion" component="div" />
                                        </div>
                                        <div className="form-group">
                                            <label className="col-form-label mt-4" >Cambiar estado de solicitud</label>
                                            <div className="form-check">
                                                <Field name="estado" type="radio" value={'1'} />
                                                <label className="form-check-label mx-2" for="optionsRadios1">
                                                    Aprobado
                                                </label>
                                            </div>
                                            <div className="form-check">
                                                <Field name="estado" type="radio" value={'2'} />
                                                <label className="form-check-label mx-2" for="optionsRadios1">
                                                    Rechazado
                                                </label>
                                            </div>
                                            <ErrorMessage className='text-danger' name="estado" component="div" />
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

export default ReservaExternaModal