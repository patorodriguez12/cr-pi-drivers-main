import React, { useEffect, useState } from "react";
import { getDrivers, setLoading, setCurrentPage } from "../../redux/actions";
import { useSelector, useDispatch } from "react-redux";
import { Link } from "react-router-dom";
import { Box, Button, Grid2, Typography, Paper } from "@mui/material";
import Card from "../Card/Card";

function CardList({ drivers }) {
  const dispatch = useDispatch();
  const driversData = useSelector((state) => state.drivers);
  const currentPage = useSelector((state) => state.currentPage);
  const searchTerm = useSelector((state) => state.searchTerm);
  const [itemsPerPage] = useState(9);

  useEffect(() => {
    dispatch(setLoading(true));
    dispatch(getDrivers(searchTerm));
  }, [dispatch, searchTerm, currentPage]);

  const indexOfLastDriver = currentPage * itemsPerPage;
  const indexOfFirstDriver = indexOfLastDriver - itemsPerPage;
  const currentDriver = driversData.slice(
    indexOfFirstDriver,
    indexOfLastDriver
  );
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
    <Grid2 item xs={12} sm={6} md={4}>
      {currentDriver.length ? (
        <div>
          <Grid2
            container
            sx={{
              minHeight: "100vh",
              justifyContent: "center",
              padding: "10px",
            }}
          >
            {currentDriver.map((driver) => (
              <Grid2 key={driver.id}>
                <Card driver={driver} />
              </Grid2>
            ))}
          </Grid2>
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
        </div>
      ) : (
        <Box
          sx={{
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            height: "calc(100vh - 200px)",
            textAlign: "center",
            fontSize: "18px",
            color: "#666",
          }}
        >
          No se encontraron resultados
        </Box>
      )}
    </Grid2>
  );
}

export default CardList;
