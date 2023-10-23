import React from 'react';
import { connect } from 'react-redux';
import { toggleSortOrder, updateSortedList } from '../../redux/actions';

function Sort({ sortOrder, toggleSortOrder, filteredData }) {
    const handleToggleSort = () => {
        const newSortOrder = sortOrder === 'asc' ? 'desc': 'asc';
        toggleSortOrder();
        const sortedList = [...filteredData];
        sortedList.sort((a, b) => {
            if (newSortOrder === 'asc') {
                return a.name.forename.localeCompare(b.name.forename);
            } else {
                return b.name.forename.localeCompare(a.name.forename);
            }
        });
        updateSortedList(sortedList);
    };

    return (
        <div>
            <label>Ascending <input type="checkbox" checked={sortOrder === 'asc'} onChange={handleToggleSort} />
            </label>
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

export default connect(mapStateToProps, mapDispatchToProps)(Sort);