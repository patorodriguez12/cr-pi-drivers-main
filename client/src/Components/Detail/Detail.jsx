import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import { getDriverById } from "../../redux/actions";
import "./Detail.css";

function Detail() {
  const { id } = useParams(); // Obtiene el ID del driver de la URL
  const dispatch = useDispatch();
  const drivers = useSelector((state) => state.drivers); // Obtiene todos los drivers del estado

  useEffect(() => {
    dispatch(getDriverById(id)); // Llama a la acción para cargar los datos del driver
  }, [dispatch, id]);

  // Función para verificar si el ID es un UUID
  const isUUID = (id) => {
    const uuidRegex = /^[0-9a-fA-F]{8}-[0-9a-fA-F]{4}-[4][0-9a-fA-F]{3}-[89abAB][0-9a-fA-F]{3}-[0-9a-fA-F]{12}$/;
    return uuidRegex.test(id);
  };

  // Filtra el driver que coincide con el ID
  const driver = drivers.find((driver) => {
    if (isUUID(id)) {
      return driver.id === id; // Comparación para UUID
    } else {
      return driver.id === parseInt(id); // Comparación para integer
    }
  });

  if (!driver) {
    return <p>Loading...</p>;
  }

  return (
    <div className="detail-container">
      <h1>{`${driver.forename} ${driver.surname}`}</h1>
      <img src={driver.image} alt={`${driver.forename} ${driver.surname}`} />
      <p><strong>Date of Birth:</strong> {driver.dob}</p>
      <p><strong>Nationality:</strong> {driver.nationality}</p>
      <p><strong>Teams:</strong> {driver.teams}</p>
      <p><strong>Description:</strong> {driver.description}</p>
    </div>
  );
}

export default Detail;
