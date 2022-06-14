import {IoBarChartSharp} from "react-icons/io5"
import {MdQueryStats} from "react-icons/md"
import {FaWpforms} from "react-icons/fa"
import {ImProfile} from "react-icons/im"

const links = [
    {
        id: 1,
        text: "todas las ofertas",
        path: "/",
        icon: <MdQueryStats />
    },
    {
        id: 2,
        text: "Estadísticas ",
        path: "stats",
        icon: <IoBarChartSharp />
    },
    {
        id: 3,
        text: "añadir una oferta",
        path: "add-job",
        icon: <FaWpforms />
    },
    {
        id: 4,
        text: "perfil",
        path: "profile",
        icon: <ImProfile />
    }

]

export default links