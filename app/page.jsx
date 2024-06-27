import Image from "next/image"
import codigoQR from '@/public/qr-apk.png'

export default function IndexPage() {
    return (
        <div className="d-flex align-items-center justify-content-center vh-100"
            style={{ backgroundImage: 'url(https://p1.pxfuel.com/preview/1006/270/445/blue-water-shimmer-gradient-white-light.jpg)', backgroundSize: 'cover' }}
        >
            <div className="card m-3">
                <h3 className="card-header">APK aplicación móvil</h3>
                <div className="card-body">
                    <h6 className="card-subtitle text-muted" style={{ maxWidth: '300px' }}>Para utilizar la aplicación móvil en su dispositivo escanee el código QR o haga clic en el enlace </h6>
                </div>
                <Image src={codigoQR} width={200} height={200} className="rounded mx-auto d-block" alt="APP-PUCETEC" />
                <div className="card-body">
                    <a href="/saludPUCESI.apk" download>Clic aqui para descargar</a>
                </div>
            </div>
        </div>
    )
}