import { Route, Routes, BrowserRouter as Router } from "react-router-dom";
import { ConverterPage, Login, Register } from "../src/Pages/index";

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Login />} />
        <Route path="/converter" element={<ConverterPage />} />
        <Route path="/register" element={<Register />} />
      </Routes>
    </Router>
  );
}

export default App;
