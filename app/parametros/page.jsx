import CardCarrera from "@/components/cards/CardCarrera"
import CardNivel from "@/components/cards/CardNivel"
import CardParalelo from "@/components/cards/CardParalelo"
import CardPeriodo from "@/components/cards/CardPeriodo"

function Parametros() {
    return (
        <div className="container-sm p-3">
            <h1 style={{ textAlign: 'center' }}>Parametros de solicitudes</h1>
            <div className="row">
                <div className="col-sm-6">
                    <CardCarrera />
                </div>
                <div className="col-sm-6">
                    <CardNivel />
                </div>
            </div>
            <div className="row">
                <div className="col-sm-6">
                    <CardParalelo />
                </div>
                <div className="col-sm-6">
                    <CardPeriodo />
                </div>
            </div>
        </div>
    )
}

export default Parametros