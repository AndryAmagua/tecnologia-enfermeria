import CardCarrera from "@/components/cards/CardCarrera"
import CardNivel from "@/components/cards/CardNivel"
import CardParalelo from "@/components/cards/CardParalelo"
import CardPeriodo from "@/components/cards/CardPeriodo"

function Parametros() {
    return (
        <div className="container-sm p-3">
            <h1 style={{ textAlign: 'center' }}>Parámetros de solicitudes</h1>

            <ul className="nav nav-tabs" role="tablist">
                <li className="nav-item" role="presentation">
                    <a className="nav-link" data-bs-toggle="tab" href="#carreras" role="tab">CARRERAS</a>
                </li>
                <li className="nav-item" role="presentation">
                    <a className="nav-link" data-bs-toggle="tab" href="#niveles" role="tab">NIVELES</a>
                </li>
                <li className="nav-item" role="presentation">
                    <a className="nav-link" data-bs-toggle="tab" href="#paralelos" role="tab" >PARALELOS</a>
                </li>
                <li className="nav-item" role="presentation">
                    <a className="nav-link" data-bs-toggle="tab" href="#periodos" role="tab">PERIODOS</a>
                </li>
            </ul>
            <div id="myTabContent" className="tab-content">
                <div className="tab-pane fade p-3" id="carreras" role="tabpanel">
                    <CardCarrera />
                </div>
                <div className="tab-pane fade p-3" id="niveles" role="tabpanel">
                    <CardNivel />
                </div>
                <div className="tab-pane fade p-3" id="paralelos" role="tabpanel">
                    <CardParalelo />
                </div>
                <div className="tab-pane fade p-3" id="periodos" role="tabpanel">
                    <CardPeriodo />
                </div>
            </div>
        </div>
    )
}

export default Parametros