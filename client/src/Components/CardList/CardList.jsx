import React, { useEffect, useState } from "react";
import { getDrivers, setLoading } from "../../redux/actions";
import { useSelector, useDispatch } from "react-redux";
import {
  Grid,
  Box,
  Pagination,
  Typography,
  CircularProgress,
} from "@mui/material";
import Cards from "../Card/Card";

function CardList() {
  const dispatch = useDispatch();
  const driversData = useSelector((state) => state.drivers);
  const searchTerm = useSelector((state) => state.searchTerm);
  const loading = useSelector((state) => state.loading);
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
    <Box
      sx={{
        width: "80%",
        padding: 2,
        paddingLeft: "200px",
        paddingRight: "200px",
      }}
    >
      {searchTerm && (
        <Typography
          variant="h6"
          sx={{
            color: "#EEE2DE",
            textAlign: "center",
            marginBottom: 2,
            fontStyle: "italic",
          }}
        >
          {`Showing results for: "${searchTerm}"`}
        </Typography>
      )}

      {loading ? (
        <Box
          sx={{
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            height: "70vh",
          }}
        >
          <CircularProgress color="secondary" />
        </Box>
      ) : (
        <Grid container spacing={2} sx={{ minHeight: "70vh" }}>
          {currentDriver.length ? (
            <>
              {currentDriver.map((driver) => (
                <Grid item xs={12} sm={6} md={4} key={driver.id}>
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
                color: "#EEE2DE",
              }}
            >
              Drivers not found.
            </Box>
          )}
        </Grid>
      )}
      
      {/* pagination */}
      {loading ? (
        <></>
      ) : (
        <Box
          sx={{
            color: "#EEE2DE",
            "& .MuiPaginationItem-root": {
              borderColor: "#EEE2DE",
              color: "#EEE2DE",
            },
            "& .MuiPaginationItem-root.Mui-selected": {
              backgroundColor: "#872341",
              color: "#EEE2DE",
            },
            "& .MuiPaginationItem-root:hover": {
              borderColor: "#872341",
            },
            display: "flex",
            justifyContent: "center",
            flexDirection: "column",
            alignItems: "center",
            marginTop: 4,
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
                shape="rounded"
              />
            </>
          )}
        </Box>
      )}
    </Box>
  );
}

export default CardList;
