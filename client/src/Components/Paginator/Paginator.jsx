import React from 'react';
import { connect } from 'react-redux';
import { setPage } from '../../redux/actions';
import style from './Paginator.css';

function Paginator({ currentPage, totalPages, setPage }) {
    const handlePageChange = (pageNumber) => {
        setPage(pageNumber);
    };

    return (
        <div className="paginator">
            <button onClick={() => handlePageChange(currentPage - 1)} disabled={currentPage === 1}>
            «
            </button>   
            <span>Page {currentPage} of {totalPages}</span>
            <button onClick={() => handlePageChange(currentPage + 1)} disabled={currentPage === totalPages}>
            »
            </button>
        </div>
    );
};

const mapStateToProps = (state) => ({
    currentPage: state.currentPage,
    totalPages: state.totalPages,
});

const mapDispatchToProps = {
    setPage,
};


export default connect(mapStateToProps, mapDispatchToProps)(Paginator);