'use client'
import { signIn } from "next-auth/react"
import Image from "next/image"
import logoPucesi from '@/public/logo_pucesi.png'

function Login() {
    return (
        <div className="d-flex align-items-center justify-content-center vh-100"
            style={{ backgroundImage: 'url(https://p1.pxfuel.com/preview/1006/270/445/blue-water-shimmer-gradient-white-light.jpg)', backgroundSize: 'cover' }}
        >
            <div className="row align-items-center gx-5 m-5">
                <div className="col-md-6 my-3">
                    <Image src={logoPucesi} className="img-fluid img-thumbnail" alt="PUCESI" />
                </div>
                <div className="col-md-6 my-3">
                    <div className="mx-3 py-5 px-4 rounded bg-primary">
                        <h3 className="text-light text-center mb-3">Sistema de control de reservas para enfermería</h3>
                        <div className="mb-3 align-self-center">
                            <input type="text" className="form-control" placeholder="Usuario" />
                        </div>
                        <div className="mb-3">
                            <input type="password" className="form-control" placeholder="Contraseña" />
                        </div>
                        <button type="submit" className="btn btn-light">Iniciar sesión</button>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Login