import { useEffect, useState } from 'react'
import './App.css'
import { Routes, Route, BrowserRouter as Router} from 'react-router-dom'
import Landing from './Components/Landing/Landing'

function App() {
    return (
        <div className="App" style={{ padding: "25px" }}>
            <Routes>
                <Route path='/' element={<Landing />}/>
            </Routes>
        </div>
    )
}

export default App
