import { useAppContext } from "../../context/appContext";
import { StatsContainer, Loading, ChartsContainer } from "../../components";
import { useEffect } from "react";
import { useCallback } from "react";

const Stats = () => {
  const { showStats, isLoading, monthlyApplications } = useAppContext();


  useEffect(() => {
    showStats()
  }, []);

  if (isLoading) {
    return <Loading center />;
  }
  return (
    <>
      <StatsContainer />
      {monthlyApplications.length > 0 && <ChartsContainer />}
    </>
  );
};
export default Stats;
