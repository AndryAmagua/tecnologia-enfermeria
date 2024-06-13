'use client'
import { Formik, Form, Field, ErrorMessage } from 'formik'
import SelectInsumo from "../selects/SelectInsumo"
import * as Yup from 'yup'

function AcordeonMoviminetos({ setEntrada, setSalida }) {
    const validationSchema = Yup.object({
        insumo_id: Yup.number().min(1, 'Seleccione un insumo'),
        cantidad: Yup.number().required('Cantidad es requerido').min(1, 'Cantidad minima es 1'),
    })

    return (
        <>
            <div className="accordion" id="accordionExample">
                <div className="accordion-item">
                    <h2 className="accordion-header" id="headingOne">
                        <button className="accordion-button collapsed" type="button" data-bs-toggle="collapse" data-bs-target="#collapseOne" aria-expanded="false" aria-controls="collapseOne">
                            Entradas y salidas de insumos
                        </button>
                    </h2>
                    <div id="collapseOne" className="accordion-collapse collapse" aria-labelledby="headingOne" data-bs-parent="#accordionExample" style={{}}>
                        <div className="accordion-body">
                            <div className="row">
                                <div className="col-sm-6">
                                    <div className="card border-primary">
                                        <div className="card-header">Entradas</div>
                                        <div className="card-body">
                                            <Formik
                                                initialValues={{ insumo_id: 0, fecha: new Date().toISOString().substr(0, 10), cantidad: 0 }}
                                                validationSchema={validationSchema}
                                                onSubmit={(values, { setSubmitting, resetForm }) => {
                                                    setTimeout(() => {
                                                        setEntrada(values)
                                                        resetForm()
                                                        setSubmitting(false)
                                                    }, 2000)
                                                }}
                                            >
                                                {({ isSubmitting }) => (
                                                    <Form>
                                                        <div className="form-group">
                                                            <label className="col-form-label" >Insumo</label>
                                                            <SelectInsumo />
                                                            <ErrorMessage className='text-danger' name="insumo_id" component="div" />
                                                        </div>
                                                        <div className="form-group">
                                                            <label className="col-form-label mt-2" >Fecha</label>
                                                            <Field className="form-control" type="date" name="fecha" />
                                                        </div>
                                                        <div className="form-group">
                                                            <label className="col-form-label mt-2" >Cantidad</label>
                                                            <Field className="form-control" type="number" min={0} name="cantidad" />
                                                            <ErrorMessage className='text-danger' name="cantidad" component="div" />
                                                        </div>
                                                        <div className="form-group mt-3">
                                                            <button className="btn btn-primary" type="submit" disabled={isSubmitting}>
                                                                Guardar
                                                            </button>
                                                        </div>
                                                    </Form>
                                                )}
                                            </Formik>
                                        </div>
                                    </div>
                                </div>
                                <div className="col-sm-6">
                                    <div className="card border-primary">
                                        <div className="card-header">Salidas</div>
                                        <div className="card-body">
                                            <Formik
                                                initialValues={{ insumo_id: 0, fecha: new Date().toISOString().substr(0, 10), cantidad: 0 }}
                                                validationSchema={validationSchema}
                                                onSubmit={(values, { setSubmitting, resetForm }) => {
                                                    setTimeout(() => {
                                                        setSalida(values)
                                                        resetForm()
                                                        setSubmitting(false)
                                                    }, 2000)
                                                }}
                                            >
                                                {({ isSubmitting }) => (
                                                    <Form>
                                                        <div className="form-group">
                                                            <label className="col-form-label" >Insumo</label>
                                                            <SelectInsumo />
                                                            <ErrorMessage className='text-danger' name="insumo_id" component="div" />
                                                        </div>
                                                        <div className="form-group">
                                                            <label className="col-form-label mt-2" >Fecha</label>
                                                            <Field className="form-control" type="date" name="fecha" />
                                                        </div>
                                                        <div className="form-group">
                                                            <label className="col-form-label mt-2" >Cantidad</label>
                                                            <Field className="form-control" type="number" min={0} name="cantidad" />
                                                            <ErrorMessage className='text-danger' name="cantidad" component="div" />
                                                        </div>
                                                        <div className="form-group mt-3">
                                                            <button className="btn btn-primary" type="submit" disabled={isSubmitting}>
                                                                Guardar
                                                            </button>
                                                        </div>
                                                    </Form>
                                                )}
                                            </Formik>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </>
    )
}

export default AcordeonMoviminetos