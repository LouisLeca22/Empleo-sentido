import logo from "../assets/images/logo.svg"


function Logo({width}) {
  return (
    <img src={logo} width={width} alt="job-sentido" className="logo"/>
  )
}

export default Logo