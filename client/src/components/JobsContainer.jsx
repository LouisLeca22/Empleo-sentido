import Wrapper from "../assets/wrappers/JobsContainer"
import { useEffect } from "react"
import { useAppContext } from "../context/appContext"
import Job from "./Job"
import Loading from "./Loading"
import PageBtnContainer from "./PageBtnContainer"

const JobsContainer = () => {
    
    const {getJobs, jobs, isLoading, search, searchStatus, searchType, sort, page, totalJobs, numOfPages} = useAppContext()


    useEffect(() => {
        getJobs()
    }, [search, searchType, searchStatus, sort, page])


    if (isLoading){
        return <Loading center/>
    }

    if (jobs.length === 0){
        return <Wrapper>
            <h2>No hay ofertas que coincidan con tu criterios...</h2>
        </Wrapper>
    }

  return (
    <Wrapper>
        <h5>{totalJobs} oferta{jobs.length > 1 && "s"}</h5>
        <div className="jobs">
            {jobs.map(job => {
                return <Job key={job._id} {...job} />
            })}
        </div>
        {numOfPages > 1 &&<PageBtnContainer />}
    </Wrapper>
  )
}
export default JobsContainer