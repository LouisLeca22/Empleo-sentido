import Wrapper from "../assets/wrappers/ErrorPage"
import img from "../assets/images/not-found.svg"
import {Link} from "react-router-dom"

function Error() {
  return (
    <Wrapper className="full-page">
      <div>
        <img src={img} alt="404" />
        <h3>No se encontró la página </h3>
        <p>No podemos encontrar la página que está buscando</p>
        <Link to="/">Volver</Link>
      </div>
    </Wrapper>
  )
}

export default Error