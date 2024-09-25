import React, { useEffect, useState } from "react";
import { getDrivers, setLoading } from "../../redux/actions";
import { useSelector, useDispatch } from "react-redux";
import { Grid, Box, Pagination, Typography } from "@mui/material";
import Cards from "../Card/Card";
import Detail from "../Detail/Detail";

function CardList() {
  const dispatch = useDispatch();
  const driversData = useSelector((state) => state.drivers);
  const searchTerm = useSelector((state) => state.searchTerm);
  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage] = useState(9);

  useEffect(() => {
    dispatch(setLoading(true));
    dispatch(getDrivers(searchTerm));
  }, [dispatch, searchTerm]);

  const indexOfLastDriver = currentPage * itemsPerPage;
  const indexOfFirstDriver = indexOfLastDriver - itemsPerPage;
  const currentDriver = driversData.slice(
    indexOfFirstDriver,
    indexOfLastDriver
  );
  const totalPages = Math.ceil(driversData.length / itemsPerPage);

  useEffect(() => {
    if (currentPage > totalPages) {
      setCurrentPage(totalPages > 0 ? totalPages : 1);
    }
  }, [driversData, totalPages, currentPage]);


  return (
    <Box sx={{ width: "80%", padding: 2 }}>
      <Grid
        container
        spacing={2}
        sx={{ minHeight: "70vh" }} // Establecer una altura mínima para evitar el cambio de paginado
      >
        {currentDriver.length ? (
          <>
            {currentDriver.map((driver) => (
              <Grid
                item
                xs={12}
                sm={6}
                md={4}
                key={driver.id}
              >
                <Cards driver={driver} />
              </Grid>
            ))}
          </>
        ) : (
          <Box
            sx={{
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
              height: "100vh",
              textAlign: "center",
              fontSize: "18px",
              color: "#666",
            }}
          >
            No se encontraron resultados
          </Box>
        )}
      </Grid>

      {/* Paginación */}
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
          display: "flex",
          justifyContent: "center",
          marginTop: 4, // Mantén la separación del paginado
        }}
      >
        {totalPages > 1 && (
          <>
            <Typography sx={{ marginRight: 2 }}>
              Page {currentPage} of {totalPages}
            </Typography>
            <Pagination
              count={totalPages}
              page={currentPage}
              onChange={(e, page) => setCurrentPage(page)}
              color="primary"
              shape="rounded"
              siblingCount={2}
            />
          </>
        )}
      </Box>
    </Box>
  );
}

export default CardList;
