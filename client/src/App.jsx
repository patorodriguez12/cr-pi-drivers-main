import { Routes, Route, BrowserRouter as Router } from "react-router-dom";
import Landing from "./Components/Views/Landing/Landing";
import Home from "./Components/Views/Home/HomePage/Home";
import Detail from "./Components/Views/Detail/Detail";
import Form from "./Components/Views/Form/Form";

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
