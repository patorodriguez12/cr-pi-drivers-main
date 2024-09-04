import React, { useEffect, useState } from "react";
import { getDrivers, setLoading, setCurrentPage } from "../../redux/actions";
import { useSelector, useDispatch } from "react-redux";
import { Link } from "react-router-dom";
import { Box, Button, Grid, Typography, Paper } from "@mui/material";

function Cards({ drivers }) {
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
    <Box sx={{ padding: "15px 200px" }}>
      {currentDriver.length ? (
        <div>
          <Grid
            container
            spacing={3}
            sx={{
              minHeight: "100vh",
              justifyContent: "center",
              padding: "15px",
            }}
          >
            {currentDriver?.length &&
              currentDriver.map((driver) => (
                <Grid item xs={12} sm={6} md={4} key={driver.id}>
                  <Paper
                    sx={{
                      width: "300px",
                      height: "450px",
                      borderRadius: "8px",
                      overflow: "hidden",
                      boxShadow: "0px 2px 4px rgba(0, 0, 0, 0.2)",
                      margin: "20px",
                      backgroundColor: "white",
                      padding: "3px",
                      transition: "transform 0.3s ease, box-shadow 0.3s ease",
                      "&:hover": {
                        transform: "scale(1.03)",
                        boxShadow: "0px 4px 8px rgba(0, 0, 0, 0.3)",
                      },
                    }}
                  >
                    <Link
                      to={`/detail/${driver.id}`}
                      style={{
                        display: "flex",
                        textDecoration: "none",
                        alignItems: "center",
                        flexDirection: "column",
                      }}
                    >
                      <img
                        src={driver.image}
                        alt={driver.forename}
                        style={{
                          width: "100%",
                          height: "300px",
                          display: "block",
                          objectFit: "cover",
                        }}
                      />
                      <Typography
                        variant="h5"
                        sx={{
                          fontSize: "28px",
                          marginBottom: "8px",
                          marginTop: "25px",
                          transition: "color 0.3s ease",
                        }}
                      >
                        {driver.forename} {driver.surname}
                      </Typography>
                      <Typography
                        variant="body2"
                        sx={{
                          color: "#666",
                          fontSize: "15px",
                          lineHeight: 1.3,
                          marginBottom: "8px",
                          transition: "color 0.3s ease",
                          "&:hover": {
                            color: "#333",
                          },
                        }}
                      >
                        {driver.nationality}
                      </Typography>
                    </Link>
                  </Paper>
                </Grid>
              ))}
          </Grid>
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
    </Box>
  );
}

export default Cards;
