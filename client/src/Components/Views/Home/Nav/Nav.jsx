import React from 'react';
import { Link } from 'react-router-dom';
import style from './Nav.module.css';
import SearchBar from '../SearchBar/SearchBar';


export default function Nav() {
    return (
        <div className={style.nav}>
            <Link to={`/`} >
                <button>🡰</button>
            </Link>
            <SearchBar />
            <Link to={`/create`}>
                <button>Create new driver</button>
            </Link>
        </div>
    )
}