import Wrapper from "../assets/wrappers/Navbar"
import {FaAlignLeft, FaUserCircle, FaCaretDown} from "react-icons/fa"
import {useAppContext} from "../context/appContext"
import Logo from "./Logo"
import { useEffect, useRef, useState } from "react"
import { useNavigate } from "react-router-dom"
const Navbar = () => {
  const logoutBtnRef = useRef(null)
  const {user, toggleSidebar, logoutUser} = useAppContext()
  const [showLogout, setShowLogout] = useState(false)
  const navigate = useNavigate()

  
  useEffect(() => {
    function handleClickOutside(event) {
     
      if (logoutBtnRef.current && !logoutBtnRef.current.contains(event.target)) {
        setShowLogout(false);
      }
    }

    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [logoutBtnRef]);

  
  return (
    <Wrapper>
      <div className="nav-center">
        <button type="button" className="toggle-btn" onClick={toggleSidebar}>
          <FaAlignLeft/>
        </button>
        <div>
          <Logo/>
          <h3 className="logo-text">Tablero</h3>
        </div>
        {user ? (
              <div className="btn-container" ref={logoutBtnRef} >
              <button type="button" className="btn" onClick={() => setShowLogout(!showLogout)}>
                <FaUserCircle />
                {user?.name} 
                <FaCaretDown />
              </button>
              <div className={showLogout ? "dropdown show-dropdown": "dropdown"}>
                <button type="button" className="dropdown-btn" onClick={logoutUser}>Cerrar la sesión </button>
              </div>
            </div>
        ) : (
          <div className="btn-container">
            <button type="button" className="btn" onClick={() => {navigate("/register")}}>
              Identificarse / Registrarse
            </button>
          </div>
        )}
    
      </div>
    </Wrapper>
  )
}
export default Navbar