import React from 'react';
import { Link } from 'react-router-dom';
import style from './Nav.module.css';
import SearchBar from '../SearchBar/SearchBar';
import Sort from '../Sort/Sort';
import Teams from '../Teams/Teams';
import Origin from '../Origin/Origin';

export default function Nav() {
    return (
        <div className={style.nav}>
            <Link to={`/`} >
                <button>Go Back</button>
            </Link>
            <Link to={`/create`}>
                <button>Create</button>
            </Link>
            <Sort />
            <Teams />
            <Origin />
            <SearchBar />
        </div>
    )
}