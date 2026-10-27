import { Outlet, NavLink } from 'react-router-dom';
import './MainLayout.css'; // Acordate de crear este archivo para los estilos

export default function MainLayout() {
  return (
    <div className="layout-container">
      <main className="main-content">
        <Outlet />
      </main>
      
      <nav className="bottom-nav">
        <NavLink to="/" className={({ isActive }) => isActive ? 'nav-item active' : 'nav-item'}>
          Inicio
        </NavLink>
        <NavLink to="/expenses" className={({ isActive }) => isActive ? 'nav-item active' : 'nav-item'}>
          Gastos
        </NavLink>
        <NavLink to="/settings" className={({ isActive }) => isActive ? 'nav-item active' : 'nav-item'}>
          Ajustes
        </NavLink>
      </nav>
    </div>
  );
}