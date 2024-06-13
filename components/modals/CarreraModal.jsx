import { Formik, Form, Field, ErrorMessage } from 'formik'
import * as Yup from 'yup'

function CarreraModal({ data, showModal, funcion }) {
    const validationSchema = Yup.object({
        nombre: Yup.string().required('Campo obligatorio'),
        niveles: Yup.number().min(1, 'Campo obligatorio'),
        paralelos: Yup.number().min(1, 'Campo obligatorio')
    })

    return (
        <div className="modal" style={{ display: 'block', backgroundColor: 'rgba(64, 64, 64, 0.5)' }}>
            <div className="modal-dialog">
                <div className="modal-content">
                    <div className="modal-header">
                        <h5 className="modal-title">Fomulario de carreras de enfermería</h5>
                        <button className="btn-close" onClick={() => showModal(false)}>
                            <span aria-hidden={true}></span>
                        </button>
                    </div>
                    <div className="modal-body">
                        <fieldset>
                            <Formik
                                initialValues={{ carrera_id: data.carrera_id || 0, nombre: data.nombre || "", niveles: data.niveles || 0, paralelos: data.paralelos || 0 }}
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
                                        <div className="form-group">
                                            <label className="col-form-label mt-4" >Nombre carrera</label>
                                            <Field className="form-control" type="nombre" name="nombre" />
                                            <ErrorMessage className='text-danger' name="nombre" component="div" />
                                        </div>
                                        <div className="form-group">
                                            <label className="col-form-label mt-4" >Cantidad de niveles</label>
                                            <Field className="form-control" type="number" min={0} name="niveles" />
                                            <ErrorMessage className='text-danger' name="niveles" component="div" />
                                        </div>
                                        <div className="form-group">
                                            <label className="col-form-label mt-4" >Cantidad de paralelos</label>
                                            <Field className="form-control" type="number" min={0} name="paralelos" />
                                            <ErrorMessage className='text-danger' name="paralelos" component="div" />
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

export default CarreraModal