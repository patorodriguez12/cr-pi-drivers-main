import React from "react";
import { useDispatch } from "react-redux";
import { setSearchTerm, getDrivers } from "../../redux/actions";
import { TextField, InputAdornment } from "@mui/material";
import SearchIcon from "@mui/icons-material/Search";

const SearchBar = () => {
  const dispatch = useDispatch();

  const handleChange = (event) => {
    const term = event.target.value;
    dispatch(setSearchTerm(term));
    dispatch(getDrivers(term, "", "", "", ""));
  };

  return (
    <TextField
      variant="outlined"
      placeholder="Enter driver's name"
      onChange={handleChange}
      InputProps={{
        startAdornment: (
          <InputAdornment position="end">
            <SearchIcon />
          </InputAdornment>
        ),
        style: { borderRadius: 8 }, // Puedes ajustar el radio de borde aquí
      }}
      sx={{
        backgroundColor: "white",
        borderRadius: 1,
      }}
    />
  );
};

export default SearchBar;
