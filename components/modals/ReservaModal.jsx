"use client"
import { Formik, Form, Field, ErrorMessage } from 'formik'

function ReservaModal({ data, showModal, funcion }) {
    return (
        <div className="modal" style={{ display: 'block', backgroundColor: 'rgba(64, 64, 64, 0.5)' }}>
            <div className="modal-dialog">
                <div className="modal-content">
                    <div className="modal-header">
                        <h5 className="modal-title">Fomulario de reserva interna</h5>
                        <button className="btn-close" onClick={() => showModal(false)}>
                            <span aria-hidden={true}></span>
                        </button>
                    </div>
                    <div className="modal-body">
                        <fieldset>
                            <Formik
                                initialValues={{ solicitud_id: data.solicitud_id, observacion: data.observacion || "", estado_id: (data.estado_id.toString()) }}
                                validate={values => {
                                    const errors = {}
                                    if (!values.estado_id) {
                                        errors.estado_id = 'Seleccione un nuevo estado'
                                    }
                                    if (values.estado_id == '3') {
                                        if (!values.observacion) {
                                            errors.observacion = 'Añada una breve descripción del motivo de rechazo'
                                        }
                                    }
                                    return errors;
                                }}
                                onSubmit={(values, { setSubmitting }) => {
                                    setTimeout(() => {
                                        if (values.estado_id == '2') {
                                            values.observacion = ""
                                        }
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

                                        <div className="form-group mt-4">
                                            <fieldset disabled={true}>
                                                <div className="input-group">
                                                    <span className="input-group-text">Solicitante</span>
                                                    <input className="form-control" id="disabledInput" type="text" placeholder={data.solicitante} />
                                                </div>
                                            </fieldset>
                                        </div>
                                        <div className="form-group mt-4">
                                            <fieldset disabled={true}>
                                                <div className="input-group">
                                                    <span className="input-group-text">Carrera</span>
                                                    <input className="form-control" id="disabledInput" type="text" placeholder={data.carrera} />
                                                </div>
                                            </fieldset>
                                        </div>
                                        <div className="form-group mt-4">
                                            <fieldset disabled={true}>
                                                <div className="input-group">
                                                    <span className="input-group-text">Nivel y paralelo</span>
                                                    <input className="form-control" id="disabledInput" type="text" placeholder={data.nivel + " " + data.paralelo} />
                                                </div>
                                            </fieldset>
                                        </div>
                                        <div className="form-group mt-4">
                                            <fieldset disabled={true}>
                                                <div className="input-group">
                                                    <span className="input-group-text">N° Guia</span>
                                                    <input className="form-control" id="disabledInput" type="text" placeholder={data.temaGuia} />
                                                </div>
                                            </fieldset>
                                        </div>
                                        <div className="form-group mt-4">
                                            <fieldset disabled={true}>
                                                <div className="input-group">
                                                    <span className="input-group-text">Área de practica</span>
                                                    <input className="form-control" id="disabledInput" type="text" placeholder={data.area || data.aula} />
                                                </div>
                                            </fieldset>
                                        </div>
                                        <div className="form-group">
                                            <label className="col-form-label mt-4" >Materiales y consideraciones</label>
                                            <textarea class="form-control" id="disabledText" rows="3" disabled>
                                                {data.detalle}
                                            </textarea>
                                        </div>
                                        <div className="form-group">
                                            <label className="col-form-label mt-4" >observacion (solo si la reserva es rechazada)</label>
                                            <Field className="form-control" type="text" name="observacion" />
                                            <ErrorMessage className='text-danger' name="observacion" component="div" />
                                        </div>
                                        <div className="form-group">
                                            <label className="col-form-label mt-4" >Cambiar estado de solicitud</label>
                                            <div className="form-check">
                                                <Field name="estado_id" type="radio" value={'2'} />
                                                <label className="form-check-label mx-2" for="optionsRadios1">
                                                    Aprobado
                                                </label>
                                            </div>
                                            <div className="form-check">
                                                <Field name="estado_id" type="radio" value={'3'} />
                                                <label className="form-check-label mx-2" for="optionsRadios1">
                                                    Rechazado
                                                </label>
                                            </div>
                                            <ErrorMessage className='text-danger' name="estado_id" component="div" />
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

export default ReservaModal