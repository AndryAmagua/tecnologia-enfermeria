"use client"
import { Formik, Form, Field, ErrorMessage } from 'formik'
import * as Yup from 'yup'

function UsuarioModal({ data, showModal, funcion }) {
    const validationSchema = Yup.object({
        nombres: Yup.string().required('Campo obligatorio'),
        cedula: Yup.string().required('Campo obligatorio')
    })

    return (
        <div className="modal" style={{ display: 'block', backgroundColor: 'rgba(64, 64, 64, 0.5)' }}>
            <div className="modal-dialog">
                <div className="modal-content">
                    <div className="modal-header">
                        <h5 className="modal-title">Fomulario de usuarios</h5>
                        <button className="btn-close" onClick={() => showModal(false)}>
                            <span aria-hidden={true}></span>
                        </button>
                    </div>
                    <div className="modal-body">
                        <fieldset>
                            <Formik
                                initialValues={{ usuario_id: data.usuario_id || 0, nombres: data.nombres || "", cedula: data.cedula || "" }}
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
                                            <label className="col-form-label mt-4" >Nombre de usuario</label>
                                            <Field className="form-control" type="text" name="nombres" />
                                            <ErrorMessage className='text-danger' name="nombres" component="div" />
                                        </div>
                                        <div className="form-group">
                                            <label className="col-form-label mt-4" >Cedula</label>
                                            <Field className="form-control" type="text" name="cedula" />
                                            <ErrorMessage className='text-danger' name="cedula" component="div" />
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

export default UsuarioModal