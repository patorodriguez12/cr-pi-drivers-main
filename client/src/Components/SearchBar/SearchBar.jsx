import style from './SearchBar.module.css'
import { useState } from "react";

export default function SearchBar(props) {
//   props = { onSearch = funcion }

    const { driver, setDriver } = useState("");
    const handleChange = event => {
        const {value} = event.target;
        setDriver(value);
    }

    return (
        <div>
            <input type="search" name="search" id="search" onChange={handleChange}/>
            <button onClick={() => props.onSearch(driver)}>Agregar</button>
        </div>
    );
}