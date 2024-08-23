import React from "react";
import style from "./Landing.css";
import { Link } from "react-router-dom";

function Landing() {
  return (
    <div className="landingContainer">
      <div className="overlay">
        <h1 className="title">Welcome to my project</h1>
        <h3 className="subtitle">
          Click the button below to see the list of drivers
        </h3>
        <Link to="/home">
          <button className="exploreButton">Explore</button>
        </Link>
      </div>
    </div>
  );
}

export default Landing;
