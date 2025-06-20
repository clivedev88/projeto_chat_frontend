import { BrowserRouter, Routes, Route } from "react-router-dom";
import Home from './pages/Home'
import Login from './pages/Login'
import Cadastro from "./pages/Cadastro";
import Dashboard from "./pages/Dashboard";
import SalaSelecionada from "./pages/SalaSelecionada";

function App() {

  return (
    <>
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Home/>} />
        <Route path="/login" element={<Login />} />
        {<Route path="/cadastro" element={<Cadastro />} />}
        {<Route path="/dashboard" element={<Dashboard />} />}
        {<Route path="/salas/:id" element={<SalaSelecionada />} />}
      </Routes>
    </BrowserRouter>
     
     
    </>
  )
}

export default App
