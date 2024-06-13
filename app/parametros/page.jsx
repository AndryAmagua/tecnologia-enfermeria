import CardCarrera from "@/components/cards/CardCarrera"
import CardPeriodo from "@/components/cards/CardPeriodo"
import CardCatedra from "@/components/cards/CardCatedra"
import CardEjecucion from "@/components/cards/CardEjecucion"

function Parametros() {
    return (
        <div className="container-sm p-3" style={{ marginTop: "70px" }}>
            <h1 style={{ textAlign: "center" }}>Parámetros de solicitudes</h1>

            <ul className="nav nav-tabs" role="tablist">
                <li className="nav-item" role="presentation">
                    <a
                        className="nav-link"
                        data-bs-toggle="tab"
                        href="#carreras"
                        role="tab"
                    >
                        CARRERAS
                    </a>
                </li>
                <li className="nav-item" role="presentation">
                    <a
                        className="nav-link"
                        data-bs-toggle="tab"
                        href="#periodos"
                        role="tab"
                    >
                        PERIODOS ACADÉMICOS
                    </a>
                </li>
                <li className="nav-item" role="presentation">
                    <a
                        className="nav-link"
                        data-bs-toggle="tab"
                        href="#asignaturas"
                        role="tab"
                    >
                        ASIGNATURAS
                    </a>
                </li>
                <li className="nav-item" role="presentation">
                    <a
                        className="nav-link"
                        data-bs-toggle="tab"
                        href="#ejecuciones"
                        role="tab"
                    >
                        EJECUCIONES DE PRACTICAS
                    </a>
                </li>
            </ul>
            <div id="myTabContent" className="tab-content">
                <div className="tab-pane fade p-3" id="carreras" role="tabpanel">
                    <CardCarrera />
                </div>
                <div className="tab-pane fade p-3" id="periodos" role="tabpanel">
                    <CardPeriodo />
                </div>
                <div className="tab-pane fade p-3" id="asignaturas" role="tabpanel">
                    <CardCatedra />
                </div>
                <div className="tab-pane fade p-3" id="ejecuciones" role="tabpanel">
                    <CardEjecucion />
                </div>
            </div>
        </div>
    )
}

export default Parametros