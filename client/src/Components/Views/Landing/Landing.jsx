import React from 'react';
import style from './Landing.module.css';
import { Link } from 'react-router-dom';

export default function Landing() {
    return (
        <div className={style.landingContainer}>
            <div className={style.overlay}>
                <h1 className={style.title}>Welcome to my project</h1>
                <h3 className={style.subtitle}>Click the button below to see the list of drivers</h3>
                <Link to="/home">
                    <button className={style.exploreButton}>Explore</button>
                </Link>
            </div>
        </div>
    )
}