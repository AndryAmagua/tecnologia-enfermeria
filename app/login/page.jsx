'use client'
import { signIn } from "next-auth/react"
import Image from "next/image"
import logoPucesi from '@/public/logo_pucesi.png'
import { Formik, Form, Field, ErrorMessage } from 'formik'
import { Alert } from "@mui/material"
import { useState } from "react"
import { useRouter } from "next/navigation"

function Login() {
    const router = useRouter()
    const [show, setShow] = useState(false)
    const [msg, setMsg] = useState("")

    return (
        <div className="d-flex align-items-center justify-content-center vh-100"
            style={{ backgroundImage: 'url(https://p1.pxfuel.com/preview/1006/270/445/blue-water-shimmer-gradient-white-light.jpg)', backgroundSize: 'cover' }}
        >
            <div className="row align-items-center gx-5 m-5">
                <div className="col-md-6 my-3">
                    <Image src={logoPucesi} className="img-fluid img-thumbnail" alt="PUCESI" />
                </div>
                <div className="col-md-6 my-3">
                    {
                        show &&
                        <Alert className="mx-3" severity="error" onClose={() => setShow(false)}>{msg}</Alert>
                    }
                    <div className="mx-3 py-5 px-5 rounded bg-primary">
                        <h3 className="text-light text-center mb-3">Sistema de control de reservas para los laboratorios de Simulación y Destrezas en Enfermería</h3>
                        <Formik
                            initialValues={{ user: "", password: "" }}
                            validate={values => {
                                const errors = {}
                                if (!values.user) {
                                    errors.user = 'Usuario requerido'
                                }
                                if (!values.password) {
                                    errors.password = 'Contraseña requerida'
                                }
                                return errors
                            }}
                            onSubmit={async (values, { setSubmitting }) => {
                                const res = await signIn("credentials", {
                                    username: values.user,
                                    password: values.password,
                                    redirect: false
                                })
                                if (res?.error) {
                                    setMsg(res.error)
                                    setShow(true)
                                } else {
                                    if (res?.ok) router.push('/equipos')
                                }

                                setSubmitting(false)
                            }}
                        >
                            {({ isSubmitting }) => (
                                <Form>
                                    <div className="form-group">
                                        <Field className="form-control" type="text" name="user" placeholder="usuario" />
                                        <ErrorMessage className='text-light' name="user" component="div" />
                                    </div>
                                    <div className="form-group mt-4">
                                        <Field className="form-control" type="password" name="password" placeholder="contraseña" />
                                        <ErrorMessage className='text-light' name="password" component="div" />
                                    </div>
                                    <div className="form-group mt-4">
                                        <button className="btn btn-primary" type="submit" disabled={isSubmitting}>
                                            INGRESAR
                                        </button>
                                    </div>
                                </Form>
                            )}
                        </Formik>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Login