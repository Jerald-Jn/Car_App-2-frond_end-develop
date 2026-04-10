import { Navigate } from "react-router-dom";
import { useContext } from "react";
import { StoreContext } from "../store/StoreContext";

interface ProtectedRouteProps {
  children: React.ReactNode;
}

const ProtectedRoute:React.FC<ProtectedRouteProps> = ({ children }) => {
const { token } = useContext(StoreContext);
  if (!token.current) {
    return <Navigate to="/login" replace />;
  }
  return children;
};

export default ProtectedRoute;