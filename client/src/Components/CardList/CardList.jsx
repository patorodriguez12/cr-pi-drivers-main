import React, { useEffect, useState } from "react";
import { getDrivers, setLoading } from "../../redux/actions";
import { useSelector, useDispatch } from "react-redux";
import { Grid, Box, Pagination, Typography } from "@mui/material";
import Cards from "../Card/Card";

function CardList() {
  const dispatch = useDispatch();
  const driversData = useSelector((state) => state.drivers);
  const searchTerm = useSelector((state) => state.searchTerm);
  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage] = useState(10);

  // Recalcular las páginas cuando los datos cambian
  const totalPages = Math.ceil(driversData.length / itemsPerPage);

  useEffect(() => {
    // Si el filtro cambia y la página actual es mayor que el total de páginas, ajusta la página
    if (currentPage > totalPages) {
      setCurrentPage(totalPages > 0 ? totalPages : 1); // Ajustar a la última página o a 1 si no hay páginas
    }
  }, [driversData, totalPages, currentPage]);

  useEffect(() => {
    dispatch(setLoading(true));
    dispatch(getDrivers(searchTerm, currentPage, itemsPerPage)); // Asegúrate de pasar la página actual
  }, [dispatch, searchTerm, currentPage, itemsPerPage]);

  const indexOfLastDriver = currentPage * itemsPerPage;
  const indexOfFirstDriver = indexOfLastDriver - itemsPerPage;
  const currentDriver = driversData.slice(
    indexOfFirstDriver,
    indexOfLastDriver
  );

  return (
    <Box
      sx={{
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        alignContent: "center",
        minHeight: "100vh",
        marginTop: "20px",
      }}
    >
      {currentDriver.length ? (
        <>
          <Box
            sx={{
              display: "flex",
              flexWrap: "wrap",
              gap: "25px",
              justifyContent: "center",
              margin: "0 auto",
            }}
          >
            {currentDriver.map((driver) => (
              <Box
                key={driver.id}
                sx={{
                  width: "300px",
                  flexShrink: 0,
                }}
              >
                <Cards driver={driver} />
              </Box>
            ))}
          </Box>
          <Box
            sx={{
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
              marginTop: "20px",
            }}
          >
            <Box
              sx={{
                color: "#fff",
                "& .MuiPaginationItem-root": {
                  borderColor: "#fff",
                  color: "#fff",
                },
                "& .MuiPaginationItem-root.Mui-selected": {
                  backgroundColor: "#007bff",
                  color: "#fff",
                },
                "& .MuiPaginationItem-root:hover": {
                  borderColor: "#007bff",
                },
                marginTop: "20px",
              }}
            >
              {totalPages > 1 && (
                <Box
                  sx={{
                    display: "flex",
                    flexDirection: "column",
                    alignItems: "center",
                  }}
                >
                  <Typography>
                    Page {currentPage} of {totalPages}
                  </Typography>
                  <Pagination
                    count={totalPages}
                    page={currentPage}
                    onChange={(e, page) => setCurrentPage(page)}
                    primary="main.secondary"
                    shape="rounded"
                    showFirstButton
                    showLastButton
                    siblingCount={2}
                  />
                </Box>
              )}
            </Box>
          </Box>
        </>
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

export default CardList;
