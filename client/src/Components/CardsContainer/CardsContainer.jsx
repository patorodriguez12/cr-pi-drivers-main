import Card from "../Card/Card";
import React, { useEffect, useState } from "react";
import "./CardsContainer.css"; // Asegúrate de importar el archivo CSS
import { getDrivers, setLoading } from "../../redux/actions";
import { useSelector, useDispatch } from "react-redux";
import { Link } from "react-router-dom";

function Cards({ drivers }) {
  const dispatch = useDispatch();
  const driversData = useSelector((state) => state.drivers);
  const loading = useSelector((state) => state.loading);
  const [driverName, setDriverName] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage] = useState(9);

  useEffect(() => {
    dispatch(setLoading(true));
    dispatch(getDrivers(driverName));
  });

  const driversMap = driversData.length
    ? driversData.reduce(
        (a, driver) => ({ ...a, [driver.driverID]: driver }),
        {}
      )
    : {};

  const indexOfLastDriver = currentPage * itemsPerPage;
  const indexOfFirstDriver = indexOfLastDriver - itemsPerPage;
  const currentDriver = driversData.slice(
    indexOfFirstDriver,
    indexOfLastDriver
  );
  const totalPages = Math.ceil(driversData.length / itemsPerPage);

  useEffect(() => {
    dispatch(getDrivers(driverName));
  }, []);

  const handlePageChange = (page) => {
    setCurrentPage(page);
  };

  const renderPageNumbers = () => {
    const pages = [];

    const startPage = Math.max(1, currentPage - 2);
    const endPage = Math.min(totalPages, currentPage + 2);

    for (let i = startPage; i <= endPage; i++) {
      pages.push(
        <button
          key={i}
          onClick={() => handlePageChange(i)}
          className={currentPage === i ? "active" : ""}
        >
          {i}
        </button>
      );
    }

    return pages;
  };

  return (
    <div>
      <section className="cards-container">
        {currentDriver?.length &&
          currentDriver.map((driver) => (
            <div className="card" key={driver.driverID}>
              <Link className="link">
                <img src={driver.image} alt={driver.forename} />
                <h1>
                  {driver.forename} {driver.surname}
                </h1>
                <p>{driver.nationality}</p>
              </Link>
            </div>
          ))}
      </section>

      <section className="pagination">
        <button
          onClick={() => handlePageChange(currentPage - 1)}
          className={currentPage === 1 ? "disabled" : ""}
          disabled={currentPage === 1}
        >
          &lt;
        </button>

        {renderPageNumbers()}

        <button
          onClick={() => handlePageChange(currentPage + 1)}
          className={currentPage === totalPages ? "disabled" : ""}
          disabled={currentPage === totalPages}
        >
          &gt;
        </button>
      </section>
    </div>
  );
}

export default Cards;
