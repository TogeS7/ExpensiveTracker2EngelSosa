import { Routes, Route } from 'react-router-dom';
import MainLayout from '../layouts/MainLayout';


const HomeScreen = () => <div style={{ padding: '20px' }}>Pantalla de Inicio (JC)</div>;
const ExpensesScreen = () => <div style={{ padding: '20px' }}>Listado de Gastos (JC)</div>;
const ExpenseDetailScreen = () => <div style={{ padding: '20px' }}>Detalle del Gasto (JC)</div>;
const SettingsScreen = () => <div style={{ padding: '20px' }}>Ajustes (Capitán)</div>;

export default function AppRouter() {
  return (
    <Routes>
      {/* El MainLayout envuelve a las rutas principales para mostrar la barra inferior */}
      <Route element={<MainLayout />}>
        <Route path="/" element={<HomeScreen />} />
        <Route path="/expenses" element={<ExpensesScreen />} />
        <Route path="/settings" element={<SettingsScreen />} />
      </Route>
      
      {/* El detalle va afuera del layout porque suele ocupar toda la pantalla, sin la barra */}
      <Route path="/expenses/:id" element={<ExpenseDetailScreen />} />
    </Routes>
  );
}