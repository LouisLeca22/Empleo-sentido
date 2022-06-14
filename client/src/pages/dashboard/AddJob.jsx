import { useAppContext } from "../../context/appContext";
import { FormRow, Alert, FormRowSelect } from "../../components";
import Wrapper from "../../assets/wrappers/DashboardFormPage";

const AddJob = () => {
  const {
    isLoading,
    isEditing,
    showAlert,
    displayAlert,
    position,
    company,
    jobLocation,
    jobType,
    jobTypeOptions,
    status,
    statusOptions,
    handleChange,
    clearValues,
    createJob,
    editJob
  } = useAppContext();

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!position || !company || !jobLocation) {
      displayAlert({
        type: "danger",
        text: "Por favor, rellena todos los campos",
      });
      return;
    }

    if(isEditing){
      editJob()
      return 
    }

    createJob()
  };


  const handleJobInput = (e) => {
    const name = e.target.name;
    const value = e.target.value;
    handleChange({ name, value });
  };
  return (
    <Wrapper>
      <form className="form">
        <h3>{isEditing ? "Modifica tu oferta" : "Añade una oferta"}</h3>
        {showAlert && <Alert />}
        <div className="form-center">
          <FormRow
            labelText="Puesto"
            type="text"
            name="position"
            value={position}
            handleChange={handleJobInput}
          />
          <FormRow
            labelText="Empresa"
            type="text"
            name="company"
            value={company}
            handleChange={handleJobInput}
          />
          <FormRow
            labelText="Ubicación"
            type="text"
            name="jobLocation"
            value={jobLocation}
            handleChange={handleJobInput}
          />
          <FormRowSelect
            name="status"
            value={status}
            handleChange={handleJobInput}
            list={statusOptions}
            labelText="Estado"
          />
          <FormRowSelect
            name="jobType"
            value={jobType}
            handleChange={handleJobInput}
            labelText="Tipo de empleo"
            list={jobTypeOptions}
          />
          <div className="btn-container">
            <button
              type="submit"
              className="btn btn-block submit-btn"
              onClick={handleSubmit}
              disabled={isLoading}
            >
              {isLoading ? "Cargando..." : "Guardar"} 
            </button>
            <button className="btn btn-block clear-btn" onClick={(e) => {
              e.preventDefault()
              clearValues()
            }}>
              Borrar
            </button>
          </div>
        </div>
      </form>
    </Wrapper>
  );
};
export default AddJob;
