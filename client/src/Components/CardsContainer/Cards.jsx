import Card from "../Card/Card";
import React from "react";
import { connect } from "react-redux";
import { setTotalPage, setPage } from "../../redux/actions";
import style from "./Cards.css";

function Cards({ currentPage, driversPerPage, drivers }) {
  const startIndex = (currentPage - 1) * driversPerPage;
  const endIndex = startIndex + driversPerPage;
  const driversToShow = drivers.slice(startIndex, endIndex);

  return (
    <div>
      <div className="cards">
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
  setPage,
  setTotalPage,
};

export default connect(mapStateToProps, mapDispatchToProps)(Cards);
