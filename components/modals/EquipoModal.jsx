"use client"
import SelectCategoria from '../selects/SelectCategoria'
import SelectLaboratorio from '../selects/SelectLaboratorio';
import { Formik, Form, Field, ErrorMessage } from 'formik'
import * as Yup from 'yup'

function EquipoModal({ data, showModal, funcion }) {
    const validationSchema = Yup.object({
        codigo_sap: Yup.number().typeError('Codigo SAP solo debe contener numeros'),
        nombre: Yup.string().required('El nombre de equipo es requerido'),
        cantidad_piezas: Yup.number().required('Cantidad de piezas es requerido').min(1, 'Cantidad minima de piezas es 1'),
        categoria_id: Yup.number().min(1, 'Seleccione una categoría'),
        area_id: Yup.number().min(1, 'Selecione una ubicación de almacenamiento')
    })

    return (
        <div className="modal" style={{ display: 'block', backgroundColor: 'rgba(64, 64, 64, 0.5)' }}>
            <div className="modal-dialog">
                <div className="modal-content">
                    <div className="modal-header">
                        <h5 className="modal-title">Fomulario de equipos biomédicos</h5>
                        <button className="btn-close" onClick={() => showModal(false)}>
                            <span aria-hidden={true}></span>
                        </button>
                    </div>
                    <div className="modal-body">
                        <fieldset>
                            <Formik
                                initialValues={{ equipo_id: data.equipo_id || 0, codigo_sap: data.codigo_sap || "", nombre: data.nombre || "", cantidad_piezas: data.cantidad_piezas || 0, especificaciones: data.especificaciones || "", marca: data.marca || "", categoria_id: data.categoria_id || 0, area_id: data.area_id || 0 }}
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
                                            <label className="col-form-label mt-4" >Codigo</label>
                                            <Field className="form-control" type="text" name="codigo_sap" />
                                            <ErrorMessage className='text-danger' name="codigo_sap" component="div" />
                                        </div>
                                        <div className="form-group">
                                            <label className="col-form-label mt-4" >Nombre</label>
                                            <Field className="form-control" type="text" name="nombre" />
                                            <ErrorMessage className='text-danger' name="nombre" component="div" />
                                        </div>
                                        <div className="form-group">
                                            <label className="col-form-label mt-4" >Cantidad de piezas</label>
                                            <Field className="form-control" type="number" min={0} name="cantidad_piezas" />
                                            <ErrorMessage className='text-danger' name="cantidad_piezas" component="div" />
                                        </div>
                                        <div className="form-group">
                                            <label className="col-form-label mt-4" >Especificaciones</label>
                                            <Field as="textarea" name="especificaciones" rows="5" cols="50" />
                                            <ErrorMessage className='text-danger' name="especificaciones" component="div" />
                                        </div>
                                        <div className="form-group">
                                            <label className="col-form-label mt-4" >Marca</label>
                                            <Field className="form-control" type="text" name="marca" />
                                            <ErrorMessage className='text-danger' name="marca" component="div" />
                                        </div>
                                        <div className="form-group">
                                            <label className="col-form-label mt-4" >Categoría</label>
                                            <SelectCategoria />
                                            <ErrorMessage className='text-danger' name="categoria_id" component="div" />
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

export default EquipoModal