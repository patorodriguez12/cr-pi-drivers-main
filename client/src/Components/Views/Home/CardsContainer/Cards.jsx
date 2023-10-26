import Card from "../Card/Card";
import React from "react";
import style from "./Cards.module.css";
import { connect } from "react-redux";
import SortByAz from "../Sort/SortByAZ";
import SortByDate from "../Sort/SortByDate";
import SortByTeam from "../Sort/SortByTeam";
import SortByOrigin from "../Sort/SortByOrigin";

function Cards({ currentPage, driversPerPage, drivers }) {
  // Resto del código para la paginación y renderizado de las tarjetas
  const startIndex = (currentPage - 1) * driversPerPage;
  const endIndex = startIndex + driversPerPage;
  const driversToShow = drivers.slice(startIndex, endIndex);

  return (
    <div className={style.container}>
      <div className={style.filters}>
        <SortByAz className={style.filterAZ} />
        <SortByDate className={style.filterDate}/>
        <SortByTeam className={style.filterTeam} />
        <SortByOrigin className={style.filterOrigin} />
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

export default connect(mapStateToProps)(Cards);
