import BarChart from "./BarChart"
import AreaChart from "./AreaChart"
import {useState} from "react"
import {useAppContext} from "../context/appContext"
import Wrapper from "../assets/wrappers/ChartsContainer"

function ChartsContainer() {
  const [barChart, setBarChart] = useState(true)
  const {monthlyApplications: data} = useAppContext()
  return (
    <Wrapper>
      <h4>Solicitudes mensuales </h4>
      <button type="button" onClick={() => setBarChart(!barChart)}>
        {barChart ? "Gráfico de área ": "Gráfico de barras "}
      </button>
      {barChart ? 
      <BarChart data={data} /> :
      <AreaChart data={data} />
    }
    </Wrapper>
  )
}
export default ChartsContainer