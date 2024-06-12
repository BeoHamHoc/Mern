import Navbar from "react-bootstrap/Navbar";
import Nav from "react-bootstrap/Nav";
import learnItLogo from "../../assets/logo.svg";
import logoutIcon from "../../assets/logout.svg";
import Button from "react-bootstrap/Button";
import { Link } from "react-router-dom";
import { AuthContext } from "../../contexts/AuthContext";
import { useContext } from "react";
import "../../App.css";
const NavbarMenu = () => {
  const {
    authState: {
      user: { username },
    },
	logoutUser
  } = useContext(AuthContext);
 const logout = () => logoutUser() 
  return (
    <Navbar expand="lg" bg="primary" variant="dark" className="shadow">
      <Navbar.Brand className="fw-bolder text-white">
        <img
          src={learnItLogo}
          alt="learnItLogo"
          width="32"
          height="32"
          className="me-2"
        />
        LearnIt
      </Navbar.Brand>

      <Navbar.Toggle aria-controls="basic-navbar-nav" />

      <Navbar.Collapse id="basic-navbar-nav">
        <Nav className="me-auto">
          <Nav.Link
            className="fw-bolder text-white"
            to="/dashboard"
            as={Link}
          >
            Dashboard
          </Nav.Link>
          <Nav.Link
            className="fw-bolder text-white"
            to="/about"
            as={Link}
          >
            About
          </Nav.Link>
        </Nav>

        <Nav>
          <Nav.Link className="fw-bolder text-white" disabled>
            Welcome {username}
          </Nav.Link>
          <Button
            variant="secondary"
            className="fw-bolder text-white"
            onClick={logout}
          >
            <img
              src={logoutIcon}
              alt="logoutIcon"
              width="32"
              height="32"
              className="me-2"
            />
            Logout
          </Button>
        </Nav>
      </Navbar.Collapse>
    </Navbar>
  );
};

export default NavbarMenu;
