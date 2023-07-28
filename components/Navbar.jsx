'use client'
import Link from "next/link"
import { useSession, signOut } from "next-auth/react"

function Navbar() {
    const { data: session, status } = useSession()

    return (
        <nav className="navbar navbar-expand-lg bg-primary" data-bs-theme="dark">
            <div className="container-fluid">
                <h4 className="navbar-brand">PUCE TEC</h4>
                <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarColor01" aria-controls="navbarColor01" aria-expanded="false" aria-label="Toggle navigation">
                    <span className="navbar-toggler-icon"></span>
                </button>
                <div className="collapse navbar-collapse" id="navbarColor01">
                    <ul className="navbar-nav me-auto">
                        <li className="nav-item">
                            <Link className="nav-link" href="/">Inventario</Link>
                        </li>
                        <li className="nav-item">
                            <Link className="nav-link" href="/insumos">Insumos</Link>
                        </li>
                        <li className="nav-item">
                            <Link className="nav-link" href="/laboratorios">Laboratorios</Link>
                        </li>
                        <li className="nav-item">
                            <Link className="nav-link" href="/equipos">Equipos</Link>
                        </li>
                        <li className="nav-item">
                            <Link className="nav-link" href="/reservas">Reservas</Link>
                        </li>
                    </ul>

                    <div className="btn-group" role="group" aria-label="Button group with nested dropdown">
                        <div className="btn-group" role="group">
                            <button id="btnGroupDrop1" className="btn btn-primary dropdown-toggle" type="button" data-bs-toggle="dropdown" aria-expanded="false">
                            </button>
                            <div className="dropdown-menu" aria-labelledby="btnGroupDrop1">
                                <a className="dropdown-item" onClick={() => signOut()}>Cerrar sesión</a>
                                <Link className="dropdown-item" href="/parametros">Ajustes de parámetros</Link>
                            </div>
                        </div>
                        <button type="button" className="btn btn-primary disabled">Cuenta administrador</button>
                    </div>
                </div>
            </div>
        </nav>
    )
}

export default Navbar