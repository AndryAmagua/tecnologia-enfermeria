"use client"
import SelectLaboratorio from '../selects/SelectLaboratorio';
import { Formik, Form, Field, ErrorMessage } from 'formik'
import * as Yup from 'yup'

function InsumoModal({ data, showModal, funcion }) {
    const validationSchema = Yup.object({
        nombre: Yup.string().required('Campo obligatorio'),
        descripcion: Yup.string().required('Campo obligatorio'),
        unidad_medida: Yup.string().required('Campo obligatorio'),
        presentacion: Yup.string().required('Campo obligatorio'),
        stock_minimo: Yup.number().min(1, 'Campo obligatorio'),
        area_id: Yup.number().min(1, 'Selecione una ubicacion de almacenamiento')
    })

    return (
        <div className="modal" style={{ display: 'block', backgroundColor: 'rgba(64, 64, 64, 0.5)' }}>
            <div className="modal-dialog">
                <div className="modal-content">
                    <div className="modal-header">
                        <h5 className="modal-title">Fomulario de insumos</h5>
                        <button className="btn-close" onClick={() => showModal(false)}>
                            <span aria-hidden={true}></span>
                        </button>
                    </div>
                    <div className="modal-body">
                        <fieldset>
                            <Formik
                                initialValues={{ insumo_id: data.insumo_id || 0, nombre: data.nombre || "", descripcion: data.descripcion || "", unidad_medida: data.unidad_medida || "", presentacion: data.presentacion || "", stock_minimo: data.stock_minimo || 0, area_id: data.area_id || 0 }}
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
                                            <label className="col-form-label mt-4" >Descripción</label>
                                            <Field className="form-control" type="text" name="descripcion" />
                                            <ErrorMessage className='text-danger' name="descripcion" component="div" />
                                        </div>
                                        <div className="form-group">
                                            <label className="col-form-label mt-4" >Unidad de medida</label>
                                            <Field className="form-control" type="text" name="unidad_medida" />
                                            <ErrorMessage className='text-danger' name="unidad_medida" component="div" />
                                        </div>
                                        <div className="form-group">
                                            <label className="col-form-label mt-4" >Presentación</label>
                                            <Field className="form-control" type="text" name="presentacion" />
                                            <ErrorMessage className='text-danger' name="presentacion" component="div" />
                                        </div>
                                        <div className="form-group">
                                            <label className="col-form-label mt-4" >Stock minimo</label>
                                            <Field className="form-control" type="number" min={0} name="stock_minimo" />
                                            <ErrorMessage className='text-danger' name="stock_minimo" component="div" />
                                        </div>
                                        <div className="form-group">
                                            <label className="col-form-label mt-4" >Ubicación</label>
                                            <SelectLaboratorio />
                                            <ErrorMessage className='text-danger' name="area_id" component="div" />
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

export default InsumoModal