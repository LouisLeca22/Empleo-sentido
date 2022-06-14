import { FormRow, FormRowSelect } from ".";
import { useAppContext } from "../context/appContext";
import Wrapper from "../assets/wrappers/SearchContainer";

const SearchContainer = () => {
  const {
    isLoading,
    search,
    searchStatus,
    searchType,
    sort,
    sortOptions,
    handleChange,
    clearFilters,
    jobTypeOptions,
    statusOptions,
  } = useAppContext();

  const handleSearch = (e) => {
    if (isLoading) return;
    handleChange({ name: e.target.name, value: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault()
    clearFilters()
  }

  return (
    <Wrapper>
      <form className="form">
        <h4>Filtrar las ofertas</h4>
        <div className="form-center">
          <FormRow
            labelText="buscar"
            type="text"
            name="search"
            value={search}
            handleChange={handleSearch}
          />
          <FormRowSelect
            labelText="estado"
            name="searchStatus"
            value={searchStatus}
            handleChange={handleSearch}
            list={["todos", ...statusOptions]}
          />
          <FormRowSelect
            labelText="tipo de oferta"
            name="searchType"
            value={searchType}
            handleChange={handleSearch}
            list={["todos", ...jobTypeOptions]}
          />
          <FormRowSelect
            labelText="ordenar"
            name="sort"
            value={sort}
            handleChange={handleSearch}
            list={sortOptions}
          />
          <button className="btn btn-block btn-danger" disabled={isLoading} onClick={handleSubmit}>Borrar filtros</button>
        </div>
      </form>
    </Wrapper>
  );
};
export default SearchContainer;
