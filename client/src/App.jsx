import { Routes, Route, BrowserRouter as Router } from "react-router-dom";
import Landing from "./Pages/Landing/Landing";
import Home from "./Pages/Home/Home";
import Detail from "./Pages/Detail/Detail"; 
import Form from "./Components/Form/Form";
import "./App.css"

function App() {
  return (
    <div className="App">
      <Routes>
        <Route path="/" element={<Landing />} />
        <Route path="/home" element={<Home />} />
        <Route path="/create" element={<Form />} />
        <Route path="/detail/:id" element={<Detail />} />
      </Routes>
    </div>
  );
}

export default App;
