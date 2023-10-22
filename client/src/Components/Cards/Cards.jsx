import Card from '../Card/Card'
import React from 'react';
import style from './Cards.module.css';
import { connect } from 'react-redux';

function Cards({ currentPage, driversPerPage, drivers }) {
    // Resto del código para la paginación y renderizado de las tarjetas
    const startIndex = (currentPage - 1) * driversPerPage;
    const endIndex = startIndex + driversPerPage;
    const driversToShow = drivers.slice(startIndex, endIndex);

    return (
        <div className={style.cards}>
            {driversToShow.map((driver) => (
                <Card
                    key={driver.id}
                    driver={driver}
                />
            ))}
        </div>
    );
}



const mapStateToProps = (state) => ({
    currentPage: state.currentPage,
    driversPerPage: 9
});

export default connect(mapStateToProps)(Cards);