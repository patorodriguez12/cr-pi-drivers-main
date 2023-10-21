import React from 'react';
import { useState } from 'react';
import { connect } from 'react-redux';
import { cleanFilter, onSearchID, setPage } from '../../redux/actions';

function SearchBar({ restart, searchByID, isLoading, currentPage, restartPage }) {
    const [name, setName] = useState('');

    const handleChange = (e) => {
        setName(e.target.value);
    };

    const handleClick = (pageNumber, name) => {
        searchByName(name);
        restartPage(pageNumber);
    };

    const handleRestartClick = () => {
        restart();
        setName('');
    };

    return (
        <div>
            <input type="search" placeholder="Search driver" onChange={handleChange} value={name} />
            <button onClick={() => handleClick(currentPage=1, name)} disable={isLoading || name.trim() === ''}>
                {isLoading ? 'Loading...' : 'Search'}
            </button>
            <button onClick={() => handleRestartClick()}>Clean filter</button>
        </div>
    )
}

const mapStateToProps = (state) => ({
    isLoading: state.isLoading
});

const mapDispatchToProps = (dispatch) => {
    return {
        searchByName: function (id) {
            dispatch(onSearchID(id))
        },
        restartPage: function (pageNumber) {
            dispatch(setPage(pageNumber))
        },
        restart: function () {
            dispatch(cleanFilter())
        }
    }
};

export default connect(mapStateToProps, mapDispatchToProps)(SearchBar);