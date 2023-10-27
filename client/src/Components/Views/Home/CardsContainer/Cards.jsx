import Card from "../Card/Card";
import React from "react";
import style from "./Cards.module.css";
import { connect } from "react-redux";
import SortByAz from "../Sort/SortByAZ";
import SortByDate from "../Sort/SortByDate";
import SortByTeam from "../Sort/SortByTeam";
import SortByOrigin from "../Sort/SortByOrigin";
import { cleanFilter } from '../../../../redux/actions';

function Cards({ currentPage, driversPerPage, drivers, cleanFilter }) {
  const startIndex = (currentPage - 1) * driversPerPage;
  const endIndex = startIndex + driversPerPage;
  const driversToShow = drivers.slice(startIndex, endIndex);
  const handleReset = () => {
    cleanFilter();
    setPage(1);
  
    // Calcula el nuevo total de páginas después de la limpieza
    setTotalPage();  // Esto debe reflejar los resultados filtrados
  };

  return (
    <div>
      <div className={style.filters}>
        <SortByAz className={style.filterAZ} />
        <SortByDate className={style.filterDate}/>
        <SortByTeam className={style.filterTeam} />
        <SortByOrigin className={style} />
        <button onClick={handleReset} className={style.button}>
        Clear filters
      </button>
      </div>
      <div className={style.cards}>
        {driversToShow.map((driver) => (
          <Card key={driver.id} driver={driver} />
        ))}
      </div>
    </div>
  );
}

const mapStateToProps = (state) => ({
  currentPage: state.currentPage,
  driversPerPage: 9,
});

const mapDispatchToProps = {
  cleanFilter,
}

export default connect(mapStateToProps, mapDispatchToProps)(Cards);