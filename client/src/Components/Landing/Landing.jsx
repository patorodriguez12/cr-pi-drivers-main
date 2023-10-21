import React from 'react';
import style from './Landing.module.css';
import { Link } from 'react-router-dom';

export default function Landing() {
    return (
        <div>
            <div>
                <h1>Landing page for drivers project</h1>
                <h3>Click the button below to see the list of drivers</h3>
                <Link to={`/home`}>
                    <button>Explore</button>
                </Link>
            </div>
        </div>
    )
}