"use client";
import Link from "next/link";
import { useSession, signOut } from "next-auth/react";

function Navbar() {
  const { data: session, status } = useSession();
  return (
    <nav
      className="navbar navbar-expand-lg bg-primary fixed-top"
      data-bs-theme="dark"
    >
      <div className="container-fluid">
        <h4 className="navbar-brand">ESCUELA DE CIENCIAS DE LA SALUD</h4>
        <button
          className="navbar-toggler"
          type="button"
          data-bs-toggle="collapse"
          data-bs-target="#navbarColor01"
          aria-controls="navbarColor01"
          aria-expanded="false"
          aria-label="Toggle navigation"
        >
          <span className="navbar-toggler-icon"></span>
        </button>
        <div className="collapse navbar-collapse" id="navbarColor01">
          {session ? (
            <>
              <ul className="navbar-nav me-auto">
                <li className="nav-item">
                  <Link className="nav-link" href="/movimientos">
                    Movimientos
                  </Link>
                </li>
                <li className="nav-item">
                  <Link className="nav-link" href="/insumos">
                    Insumos
                  </Link>
                </li>
                <li className="nav-item">
                  <Link className="nav-link" href="/laboratorios">
                    Áreas
                  </Link>
                </li>
                <li className="nav-item">
                  <Link className="nav-link" href="/equipos">
                    Equipos
                  </Link>
                </li>

                <li className="nav-item dropdown">
                  <a
                    className="nav-link dropdown-toggle"
                    data-bs-toggle="dropdown"
                    href="#"
                    role="button"
                    aria-haspopup="true"
                    aria-expanded="false"
                  >
                    Reservas
                  </a>
                  <div className="dropdown-menu">
                    <Link className="dropdown-item" href="/reservas/internas">
                      Internas
                    </Link>
                    <Link className="dropdown-item" href="/reservas/externas">
                      Externas
                    </Link>
                  </div>
                </li>
              </ul>
              <div
                className="btn-group"
                role="group"
                aria-label="Button group with nested dropdown"
              >
                <div className="btn-group" role="group">
                  <button
                    id="btnGroupDrop1"
                    className="btn btn-primary dropdown-toggle"
                    type="button"
                    data-bs-toggle="dropdown"
                    aria-expanded="false"
                  ></button>
                  <div
                    className="dropdown-menu"
                    aria-labelledby="btnGroupDrop1"
                  >
                    <a className="dropdown-item" onClick={() => signOut()}>
                      Cerrar sesión
                    </a>
                    <Link className="dropdown-item" href="/parametros">
                      Ajustes de parámetros
                    </Link>
                  </div>
                </div>
                <button type="button" className="btn btn-primary disabled">
                  {session.user.nombres}
                </button>
              </div>
            </>
          ) : (
            <>
              <ul className="navbar-nav me-auto"></ul>
              <div
                className="btn-group"
                role="group"
                aria-label="Button group with nested dropdown"
              >
                <div className="btn btn-primary my-2 my-sm-0">
                  <Link className="dropdown-item" href="/login">
                    Login
                  </Link>
                </div>
              </div>
            </>
          )}
        </div>
      </div>
    </nav>
  );
}

export default Navbar;
