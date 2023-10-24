import style from './Card.module.css';
import { Link } from 'react-router-dom';
import React from 'react';

export default function Card({ driver }) {
    const { id, image, forename, surname, nationality, dob, teams } = driver;
    return (
        <div className={style.card}>
            <Link to={`/detail/${id}`} className={style.link}>
                <img src={image} alt="F1 Driver" />
                <h1>{forename} {surname}</h1>
                <h2>{teams}</h2>
                <p>{nationality}</p>
                <p>{dob}</p>
            </Link>
        </div>
    )
}