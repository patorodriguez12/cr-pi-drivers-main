import React, { useEffect, useState } from "react";
import axios from "axios";
import { useParams } from "react-router-dom";
import { Link } from "react-router-dom";
import "./Detail.css";

function Detail() {
  const { id } = useParams();
  const [driver, setDriver] = useState({});
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const getDriver = async (id) => {
      try {
        const response = await axios.get(`http://localhost:3001/drivers/${id}`);
        const data = response.data;

        if (data) {
          setDriver(data);
        } else {
          setError("Internal server error");
        }
        setIsLoading(false);
      } catch (error) {
        console.error("Error fetching driver:", error);
        setError("Internal server error");
        setIsLoading(false);
      }
    };
    getDriver(id);
  }, [id]);

  if (isLoading) {
    return <h1>Loading...</h1>;
  }

  if (error) {
    return <p>{error}</p>;
  }

  return (
    <div className="detail">
      <div className="titleDetail">
        <h1 className="title">Driver detail</h1>
        <Link to={`/home`} className="backLink">
          <button className="back">✖</button>
        </Link>
      </div>
      <div className="detailContent">
        <div className="imageDetail">
          <img src={driver.image} alt={driver.name} className="imageDriver" />
        </div>
        <div className="box">
          <h1 className="titleDriver">{driver.forename}</h1>
          <h3>ID: {driver.id}</h3>
          <h3>Forename: {driver.forename}</h3>
          <h3>Surname: {driver.surname}</h3>
          <h3>Date of birth: {driver.dob}</h3>
          <h3>Nationality: {driver.nationality}</h3>
          <h3>Teams: {driver.teams}</h3>
          <h3>Description: {driver.description}</h3>
        </div>
      </div>
    </div>
  );
}

export default Detail;
