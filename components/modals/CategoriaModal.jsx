import { Formik, Form, Field, ErrorMessage } from 'formik'

function CategoriaModal({ data, showModal, funcion }) {
  return (
    <div className="modal" style={{ display: 'block', backgroundColor: 'rgba(64, 64, 64, 0.5)' }}>
      <div className="modal-dialog">
        <div className="modal-content">
          <div className="modal-header">
            <h5 className="modal-title">Fomulario de categorias de equipos biomédicos</h5>
            <button className="btn-close" onClick={() => showModal(false)}>
              <span aria-hidden={true}></span>
            </button>
          </div>
          <div className="modal-body">
            <fieldset>
              <Formik
                initialValues={{ categoria_id: data.categoria_id || 0, nombre: data.nombre || "" }}
                validate={values => {
                  const errors = {}
                  if (!values.nombre) {
                    errors.nombre = 'Nombre de categoría requerido'
                  }
                  return errors
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
                    {/* <div className="form-group">
                      <Field className="form-control" type="text" name="id" disabled={true} />
                    </div> */}
                    <div className="form-group">
                      <label className="col-form-label mt-4" >Nombre</label>
                      <Field className="form-control" type="nombre" name="nombre" />
                      <ErrorMessage className='text-danger' name="nombre" component="div" />
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

export default CategoriaModal