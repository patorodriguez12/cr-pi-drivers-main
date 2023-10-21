import Card from '../Card/Card'
import React from 'react';
import style from './Cards.module.css';
import { connect } from 'react-redux';

function Cards({ currentPage, driversPerPage, drivers }) {

    // Calculamod los indices de inicio y final para determinar que drivers deben mostrarse en la pagina
    const startIndex = (currentPage -1) * driversPerPage;
    const endIndex = startIndex + driversPerPage;
    const driversToShow = drivers.slice(startIndex, endIndex);

    return (
        <div className={style.cards}>
            {driversToShow.map((driver) => {
                return (
                    < Card
                        key={driver.id}
                        driver={driver}
                     />
                )
            })}
        </div>
    )
}

const mapStateToProps = (state) => ({
    currentPage: state.currentPage,
    driversPerPage: 9
});

export default connect(mapStateToProps)(Cards);