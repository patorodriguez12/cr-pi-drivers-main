import React from 'react';
import { connect } from 'react-redux';
import { toggleSortOrder, updateSortedList } from '../../../../redux/actions';
import style from './Sorts.module.css';

function SortByAz({ sortOrder, toggleSortOrder, filteredData }) {
    const handleToggleSort = (newSortOrder) => {
        toggleSortOrder();
        const sortedList = [...filteredData];
        sortedList.sort((a, b) => {
            if (newSortOrder === 'asc') {
                return a.forename.localeCompare(b.forename);
            } else {
                return b.forename.localeCompare(a.forename);
            }
        });
        updateSortedList(sortedList);
    };

    return (
        <div>
            <label className={style.text}>Sort by forename: </label>
            <select value={sortOrder} onChange={(e) => handleToggleSort(e.target.value)}>
                <option value="asc">A-Z</option>
                <option value="desc">Z-A</option>
            </select>
        </div>
    )
}

const mapStateToProps = (state) => ({
    sortOrder: state.sortOrder,
    filteredData: state.filteredData
});

const mapDispatchToProps = {
    toggleSortOrder,
    updateSortedList,
};

export default connect(mapStateToProps, mapDispatchToProps)(SortByAz);
