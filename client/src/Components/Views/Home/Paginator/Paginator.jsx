import React from 'react';
import { connect } from 'react-redux';
import { setPage } from '../../../../redux/actions';
import style from './Paginator.module.css';

function Paginator({ currentPage, totalPages, setPage }) {
    const handlePageChange = (pageNumber) => {
        setPage(pageNumber);
    };

    return (
        <div className={style.paginator}>
            <span>Page {currentPage} of {totalPages}</span>
            <button onClick={() => handlePageChange(currentPage - 1)} disabled={currentPage === 1}>
                Previous
            </button>
            <button onClick={() => handlePageChange(currentPage + 1)} disabled={currentPage === totalPages}>
                Next
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