
import main from "../assets/images/main-alternative.svg"
import Wrapper from "../assets/wrappers/LandingPage"
import {Logo} from "../components"
import { Link } from "react-router-dom"
const Landing = () => {
  return (
    <Wrapper>
        <nav>
            <Logo />
        </nav>
        <div className="container page">
            <div className="info">
                <h1> Busca un <span>empleo</span> que te corresponde</h1>
                <p>Dale un nuevo sentido a tu carrera y encuentra cientos de ofertas de trabajo que cuadran con tus valores</p>
                <Link to="/register" className="btn btn-hero">
                    Identificarse / Registrarse
                </Link>
            </div>
            <img src={main} alt="busqueda de trabajo" className="img main-img" />
        </div>
    </Wrapper>
  )
}



export default Landing