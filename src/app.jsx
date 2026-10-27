import { BrowserRouter, Routes, Route } from 'react-router-dom';

const Home = () => <div>Pantalla Inicio (Rama JC)</div>;
const Expenses = () => <div>Lista de Gastos (Rama JC)</div>;

export default function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/expenses" element={<Expenses />} />
      </Routes>
    </BrowserRouter>
  );
}