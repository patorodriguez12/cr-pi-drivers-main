import React from 'react';
import { Link } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { useEffect } from 'react';
import style from './Nav.module.css';
import SearchBar from '../SearchBar/SearchBar';
import Sort from '../Sort/Sort';

export default function Nav() {
    return (
        <div className={style.nav}>
            <Link to={`/`} >
                <button>🡰</button>
            </Link>
            <Sort />
            <SearchBar />
        </div>
    )
}