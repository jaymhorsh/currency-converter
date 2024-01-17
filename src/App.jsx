import { Flex } from "@chakra-ui/react";
import { Route, Routes, BrowserRouter as Router } from "react-router-dom";
import { ConverterPage, Login, Register } from "../src/Pages/index";
// import ConvertePage from './Pages/Converter';

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
