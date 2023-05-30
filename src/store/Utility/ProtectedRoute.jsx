import { Navigate, useLocation } from "react-router-dom";

//redux
import { useSelector } from "react-redux";

const ProtectedRoute = ({ children }) => {
  const currentUser = useSelector((state) => {
    return state.user.currentUser;
  });
  const location = useLocation();

  if (!currentUser?.id) {
    return <Navigate to="/" state={{ from: location }} replace />;
  }
  return children;
};

export default ProtectedRoute;
