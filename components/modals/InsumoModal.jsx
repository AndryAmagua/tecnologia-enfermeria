"use client"
import SelectLaboratorio from '../selects/SelectLaboratorio';
import { Formik, Form, Field, ErrorMessage } from 'formik'
import * as Yup from 'yup'

function InsumoModal({ data, showModal, funcion }) {
    const validationSchema = Yup.object({
        nombre: Yup.string().required('El nombre de equipo es requerido'),
        laboratorioID: Yup.number().min(1, 'Selecione una ubicacion de almacenamiento')
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
                                initialValues={{ id: data.INS_ID || 0, nombre: data.INS_NOMBRE || "", descripcion: data.INS_DESCRIPCION || "", unidad: data.INS_UNIDAD_MEDIDA || "", presentacion: data.INS_PRESENTACION || "", stockMinimo: data.INS_STOCK_MINIMO || 0, laboratorioID: data.LAB_ID || 0 }}
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
                                            <label className="col-form-label mt-4" >Unidad</label>
                                            <Field className="form-control" type="text" name="unidad" />
                                            <ErrorMessage className='text-danger' name="unidad" component="div" />
                                        </div>
                                        <div className="form-group">
                                            <label className="col-form-label mt-4" >Presentación</label>
                                            <Field className="form-control" type="text" name="presentacion" />
                                            <ErrorMessage className='text-danger' name="presentacion" component="div" />
                                        </div>
                                        <div className="form-group">
                                            <label className="col-form-label mt-4" >Stock minimo</label>
                                            <Field className="form-control" type="number" min={0} name="stockMinimo" />
                                            <ErrorMessage className='text-danger' name="stockMinimo" component="div" />
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

export default InsumoModal