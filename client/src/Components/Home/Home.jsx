import React from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { useEffect } from 'react';
import { allDrivers } from '../../redux/actions';
import Cards from '../Cards/Cards';
import Nav from '../Nav/Nav';
import Paginator from '../Paginator/Paginator';

// Hace la peticion al estado global
export default function Home() {
    const dispatch = useDispatch();
    const drivers = useSelector((state) => state.filteredData);

    // Escucha los cambios y los despacha
    useEffect(() => {
        dispatch(allDrivers());
    }, [dispatch])

    return (
        <div>
            <Nav />
            <Cards drivers={drivers} />
            {drivers.length > 0 ? (
                <Paginator />
            ) : (<h1>Drivers not found</h1>)}
        </div>
    )
}