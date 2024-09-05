import React, { useEffect, useState } from "react";
import { getDrivers, setLoading } from "../../redux/actions";
import { useSelector, useDispatch } from "react-redux";
import { Grid, Box } from "@mui/material";
import Cards from "../Card/Card";
import Pagination from "../Pagination/Pagination";

function CardList() {
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
  const currentDriver = driversData.slice(indexOfFirstDriver, indexOfLastDriver);

  return (
    <Box sx={{ padding: "20px", paddingLeft: "100px", paddingRight: "100px"}}>
      {currentDriver.length ? (
        <>
          <Grid container spacing={3}>
            {currentDriver.map((driver) => (
              <Grid item xs={12} sm={6} md={4} key={driver.id}>
                <Cards driver={driver} />
              </Grid>
            ))}
          </Grid>

          <Box
            sx={{
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
              marginTop: "20px",
            }}
          >
            <Pagination />
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
