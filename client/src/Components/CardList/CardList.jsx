import React, { useEffect, useState } from "react";
import { getDrivers, setLoading } from "../../redux/actions";
import { useSelector, useDispatch } from "react-redux";
import { Grid2, Box, Pagination, Typography } from "@mui/material";
import Sidebar from "../Sidebar/Sidebar";
import Cards from "../Card/Card";
import Detail from "../Detail/Detail";

function CardList() {
  const dispatch = useDispatch();
  const driversData = useSelector((state) => state.drivers);
  const searchTerm = useSelector((state) => state.searchTerm);
  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage] = useState(9);
  const [selectedDriver, setSelectedDriver] = useState(null);
  const [isDetailOpen, setIsDetailOpen] = useState(false);

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

  const handleCardClick = (driver) => {
    setSelectedDriver(driver);
    setIsDetailOpen(true);
  };

  const handleCloseDetail = () => {
    setIsDetailOpen(false);
  };

  return (
    <Grid2 container spacing={2} sx={{ marginTop: "20px" }}>
      <Grid2 item xs={12} md={3}>
        <Sidebar />
      </Grid2>
      <Grid2 item xs={12} md={9}>
        {currentDriver.length ? (
          <>
            <Box
              sx={{
                display: "grid",
                gridTemplateColumns: "repeat(3, 1fr)", // 3 columnas
                gap: "25px",
                justifyContent: "center",
              }}
            >
              {currentDriver.map((driver) => (
                <Box
                  key={driver.id}
                  sx={{
                    width: "100%", // Asegurarse de que la card ocupe el ancho completo de la celda
                  }}
                  onClick={() => handleCardClick(driver)} // Llama al handler al hacer clic
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
              height: "100vh",
              textAlign: "center",
              fontSize: "18px",
              color: "#666",
            }}
          >
            No se encontraron resultados
          </Box>
        )}
      </Grid2>
      <Detail
        driver={selectedDriver}
        open={isDetailOpen}
        handleClose={handleCloseDetail}
      />
    </Grid2>
  );
}

export default CardList;
