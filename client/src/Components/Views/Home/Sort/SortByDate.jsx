import React from 'react';
import { connect } from 'react-redux';
import { toggleSortOrderByDate, updateSortedListByDate } from '../../../../redux/actions';

function SortByDate({ sortOrder, toggleSortOrderByDate, filteredData }) {
    const handleToggleSortByDate = (newSortOrder) => {
        toggleSortOrderByDate();
        const sortedList = [...filteredData];
        sortedList.sort((a, b) => {
            const dateA = new Date(a.dob);
            const dateB = new Date(b.dob);
            if (newSortOrder === 'asc') {
                return dateA - dateB;
            } else {
                return dateB - dateA;
            }
        });
        updateSortedListByDate(sortedList);
    };

    return (
        <div>
            <label>Sort by Date of Birth:</label>
            <select value={sortOrder} onChange={(e) => handleToggleSortByDate(e.target.value)}>
                <option value="asc">Ascending</option>
                <option value="desc">Descending</option>
            </select>
        </div>
    )
}

const mapStateToProps = (state) => ({
    sortOrder: state.sortOrderByDate,
    filteredData: state.filteredData
});

const mapDispatchToProps = {
    toggleSortOrderByDate,
    updateSortedListByDate,
};

export default connect(mapStateToProps, mapDispatchToProps)(SortByDate);