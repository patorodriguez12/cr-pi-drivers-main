import React, { useEffect } from "react";
import { useParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { getDriverById } from "../../redux/actions"; // Importar la acción

function Detail() {
  const { id } = useParams(); // Obtener el ID de la URL
  const dispatch = useDispatch(); // Crear dispatch para disparar la acción
  const driver = useSelector((state) => state.driver); // Seleccionar el driver del estado de Redux
  const loading = useSelector((state) => state.loading); // Puedes agregar un estado de carga desde Redux si lo tienes
  const error = useSelector((state) => state.error); // Manejo de errores si está en tu estado

  useEffect(() => {
    dispatch(getDriverById(id)); // Disparar la acción para obtener el driver por ID al montar el componente
  }, [dispatch, id]); // Ejecutar el efecto cuando cambie el ID

  // Mostrar mensaje de carga si los datos aún están cargando
  if (loading) return <div>Loading...</div>;

  // Mostrar mensaje de error si ocurrió un error al cargar los datos
  if (error) return <div>Error loading driver: {error}</div>;

  // Si el driver no existe, mostrar un mensaje de "No encontrado"
  if (!driver || driver.length === 0) return <div>No driver found</div>;

  return (
    <div>
      <h1>
        {driver[0].forename} {driver[0].surname}
      </h1>
      <p>Nationality: {driver[0].nationality}</p>
      <p>Date of Birth: {driver[0].dob}</p>
      <p>Description: {driver[0].description}</p>
      <p>Teams: {driver[0].teams}</p>
    </div>
  );
}

export default Detail;
