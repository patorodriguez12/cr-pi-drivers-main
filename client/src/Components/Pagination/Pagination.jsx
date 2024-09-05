import React from "react";
import { useSelector, useDispatch } from "react-redux";
import { Button, Box } from "@mui/material";
import { setCurrentPage } from "../../redux/actions";

function Pagination() {
  const dispatch = useDispatch();
  const currentPage = useSelector((state) => state.currentPage);
  const driversData = useSelector((state) => state.drivers);
  const itemsPerPage = 9;
  const totalPages = Math.ceil(driversData.length / itemsPerPage);

  const handlePageChange = (page) => {
    dispatch(setCurrentPage(page));
  };

  const renderPageNumbers = () => {
    const pages = [];
    const startPage = Math.max(1, currentPage - 2);
    const endPage = Math.min(totalPages, currentPage + 2);

    for (let i = startPage; i <= endPage; i++) {
      pages.push(
        <Button
          key={i}
          onClick={() => handlePageChange(i)}
          sx={{
            padding: "8px 16px",
            margin: "0 4px",
            border: "1px solid #ccc",
            borderRadius: "4px",
            backgroundColor: currentPage === i ? "#007bff" : "#fff",
            color: currentPage === i ? "#fff" : "#000",
            cursor: "pointer",
            "&:hover": {
              backgroundColor: currentPage === i ? "#0056b3" : "#f1f1f1",
            },
          }}
        >
          {i}
        </Button>
      );
    }

    return pages;
  };

  return (
    <Box
      sx={{
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        marginTop: "16px",
      }}
    >
      <Button
        onClick={() => handlePageChange(currentPage - 1)}
        sx={{
          padding: "8px 16px",
          margin: "0 4px",
          border: "1px solid #ccc",
          borderRadius: "4px",
          backgroundColor: "#fff",
          color: "#000",
          cursor: "pointer",
          "&:hover": {
            backgroundColor: "#f1f1f1",
          },
          "&.Mui-disabled": {
            cursor: "not-allowed",
            opacity: 0.5,
          },
        }}
        disabled={currentPage === 1}
      >
        &lt;
      </Button>

      {renderPageNumbers()}

      <Button
        onClick={() => handlePageChange(currentPage + 1)}
        sx={{
          padding: "8px 16px",
          margin: "0 4px",
          border: "1px solid #ccc",
          borderRadius: "4px",
          backgroundColor: "#fff",
          color: "#000",
          cursor: "pointer",
          "&:hover": {
            backgroundColor: "#f1f1f1",
          },
          "&.Mui-disabled": {
            cursor: "not-allowed",
            opacity: 0.5,
          },
        }}
        disabled={currentPage === totalPages}
      >
        &gt;
      </Button>
    </Box>
  );
}

export default Pagination;
