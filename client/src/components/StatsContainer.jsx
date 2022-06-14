import StatsItem from "./StatsItem"
import {useAppContext} from "../context/appContext"
import {FaSuitcaseRolling, FaCalendarCheck,FaBug} from "react-icons/fa"
import Wrapper from "../assets/wrappers/StatsContainer"

function StatsContainer() {
    const {stats} = useAppContext()
    const defaultStats = [
        {
            title: "Ssolicitudes pendientes",
            count: stats.pendiente || 0,
            icon: <FaSuitcaseRolling />,
            color: "#e9b949",
            bcg: "#fcefc7"
        },
        {
            title: "Entrevistas programadas",
            count: stats.entrevista || 0,
            icon: <FaCalendarCheck />,
            color: "#647acb",
            bcg: "#e0e8f9"
        },
        {
            title: "Oferta rechazada",
            count: stats.rechazado || 0,
            icon: <FaBug />,
            color: "#d66a6a",
            bcg: '#ffeeee'
        }
    ]
  return (
    <Wrapper>
          {defaultStats.map((item, index) => (
            <StatsItem key={index} {...item}/>
          ))}
    </Wrapper>
  
  )
}
export default StatsContainer