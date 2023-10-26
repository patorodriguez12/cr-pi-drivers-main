import React from 'react';
import { Link } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { useEffect } from 'react';
import style from './Nav.module.css';
import SearchBar from '../SearchBar/SearchBar';
import Sort from '../Sort/Sort';
import SortByDate from '../Sort/SortByDate';
import Teams from '../Teams/Teams';
import Origin from '../Origin/Origin';
import { allTeams } from '../../redux/actions';

export default function Nav() {
    const dispatch = useDispatch();
    useEffect(() => {
        dispatch(allTeams());
    }, [dispatch])

    return (
        <div className={style.nav}>
            <Link to={`/`} >
                <button>🡰</button>
            </Link>
            <Link to={`/create`}>
                <button>Create</button>
            </Link>
            <Sort />
            <SortByDate />
            <Teams />
            <Origin />
            <SearchBar />
        </div>
    )
}