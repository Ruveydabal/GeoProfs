import { Navigate } from "react-router-dom";

function ProtectedRoute({ children, allowedRoles }) {
  const isLoggedIn = localStorage.getItem("isLoggedIn");
  const rol = localStorage.getItem("rol");

  // Niet ingelogd → loginpagina
  if (!isLoggedIn) {
    return <Navigate to="/" replace />;
  }

  // Geen rol bekend → terug naar login
  if (!rol) {
    localStorage.removeItem("isLoggedIn");
    return <Navigate to="/" replace />;
  }

  // Rol klopt niet → terug naar juiste pagina
  if (allowedRoles && !allowedRoles.includes(rol)) {
    return <Navigate to={`/${rol}`} replace />;
  }

  // Alles oké → pagina weergeven
  return children;
}

export default ProtectedRoute;