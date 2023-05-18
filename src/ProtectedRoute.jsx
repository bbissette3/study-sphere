// import React from "react";
// import { useSelector } from "react-redux";
// import { Navigate, useLocation } from "react-router-dom";

// const ProtectedRoute = ({ children }) => {
//   const currentUser = useSelector((state) => state.user.currentUser);
//   const location = useLocation();

//   if (!currentUser) {
//     return <Navigate to="/login" state={{ from: location }} replace />;
//   }
//   return children;
// };

// export default ProtectedRoute;
import React from "react";
import { useSelector } from "react-redux";
import { Navigate, useLocation } from "react-router-dom";

const ProtectedRoute = ({ children }) => {
  const currentUser = useSelector((state) => state.auth.currentUser);
  const location = useLocation();

  if (!currentUser || !currentUser.isAuthenticated) {
    return <Navigate to="/" replace />;
  }

  return children;
};

export default ProtectedRoute;
