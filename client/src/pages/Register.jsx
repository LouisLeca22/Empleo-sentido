import { useState, useEffect} from "react";
import { Logo, FormRow, Alert } from "../components";
import Wrapper from "../assets/wrappers/RegisterPage";
import { useAppContext } from "../context/appContext";
import {useNavigate} from "react-router-dom"

const initialValues = {
  name: "",
  email: "",
  password: "",
  isMember: true,
};

function Register() {
  const [values, setValues] = useState(initialValues);
  const navigate = useNavigate()


  const {user, isLoading, showAlert, displayAlert, setupUser} = useAppContext()

  useEffect(() => {
    if(user){
      setTimeout(() => {
        navigate("/")
      }, 2000 )
    }
  }, [navigate, user])

  const handleChange = (e) => {
    setValues((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const onSubmit = (e) => {
    e.preventDefault();
    const {name, email, password, isMember} = values 
    if(!email || !password || (!isMember && !name)){
      displayAlert({type: "danger", text: "Por favor, rellena todos los campos"})
      return 
    }

    const currentUser = {name, email, password}
    if(isMember){
      setupUser({currentUser, endPoint: "login", alertText: "¡Vamos! Redireccionando..."})
    } else {  
      setupUser({currentUser, endPoint: "register", alertText: "¡El usuario ha sido creado! Redireccionando..."})
    }
  };

  const toggleMember = () => {
    setValues((prev) => ({prev, isMember: !values.isMember }));
  };

  return (
    <Wrapper className="full-page">
      <form className="form" onSubmit={onSubmit}>
        <Logo />
        <h3>{values.isMember ? "Identificarse" : "Registrarse"}</h3>
        {showAlert && <Alert />}
        {!values.isMember && (
          <FormRow
            type="text"
            value={values.name}
            name="name"
            handleChange={handleChange}
            labelText="Nombre"
          />
        )}
        <FormRow
          type="email"
          value={values.email}
          name="email"
          handleChange={handleChange}
          labelText="Correo electrónico"
        />
        <FormRow
          type="password"
          value={values.password}
          name="password"
          handleChange={handleChange}
          labelText="Contraseña"
        />
        <button type="submit" className="btn btn-block" disabled={isLoading}>
          Enviar
        </button>
        <p>
          {values.isMember ? " ¿No está registrado?" : " ¿Ya tienes una cuenta?"}
          <button type="button" onClick={toggleMember} className="member-btn">
            {values.isMember ?  "¡Regístrate ahora!" : "¡Entra ahora!"}
          </button>
        </p>
      </form>
    </Wrapper>
  );
}

export default Register;
