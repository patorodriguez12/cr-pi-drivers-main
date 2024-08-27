import { Link } from "react-router-dom";
import React from "react";
import style from "./Card.css";

function Card({ driver }) {
  return (
    <div className="card">
      <Link className="link">DRIVER CARD</Link>
    </div>
  );
}

export default Card;
