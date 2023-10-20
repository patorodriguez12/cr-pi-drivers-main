import { useEffect, useState } from 'react'
import './App.css'
import Nav from './Components/Nav/Nav'
import Card from './Components/Card/Card'

function App() {

    const [drivers, setDrivers] = useState([]);

    function onSearch(id) {
        fetch(`https://localhost:5000/drivers/${id}`)
        .then((response) => response.json())
        .then((data) => {
            if (data.name) {
                setDrivers((oldDriv) => [...oldDriv, data]);
            } else {
                window.alert('No hay conductores con ese ID');
            }
        });
    }

    const onClose = (id) => {
        setDrivers(drivers.filter((driv) => driv.id !== id))
    }


    return (
        <div className="App" style={{ padding: "25px" }}>
            <div>
                <Nav onSearch={onSearch}/>
            </div>
            <hr />
            <div>
                <Card drivers={drivers} onClose={onClose}/>
            </div>
        </div>
    )
}

export default App
