import { Link } from "react-router-dom";
import React from "react";
import style from "./Card.css";

function Card({ driver }) {
  const { id, image, forename, surname, nationality } = driver;
  return (
    <div className="card">
      <Link to={`/detail/${id}`} className="link">
        <img src={image} alt="F1 Driver" />
        <h1>
          {forename} {surname}
        </h1>
        <p>{nationality}</p>
      </Link>
    </div>
  );
}

export default Card;
