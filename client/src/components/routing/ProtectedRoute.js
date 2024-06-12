import {  Outlet, useLocation, Navigate} from "react-router-dom";
import { useContext } from "react";
import { AuthContext } from "../../contexts/AuthContext";
import React from "react";
import Spinner from "react-bootstrap/esm/Spinner";
import Auth from "../../views/auth";
import NavbarMenu from "../layout/NavbarMenu";
const ProtectedRoute = ({ component: Component, ...rest }) => {
  const {
    authState: { authLoading, isAuthenticated },
  } = useContext(AuthContext);

  const location = useLocation()
// user cannot access dash board if not log in  
  if (authLoading) {
    return (
      <div className="spinner-container">
        <Spinner animation="border" variant="info" />
      </div>
    );
  }
  return isAuthenticated ? (
    <>
    <NavbarMenu />
    <Outlet /> </> 
  ) : (
    <Navigate to="/login" state={{ from: location }} replace /> 
  );
};

export default ProtectedRoute;
