import { Link } from "react-router-dom";
import { useContext } from "react";
import { AuthContext } from "../context/AuthContext";
import NearBiteLogo from "../assets/NearBiteLogo.png";
import "../css/Navbar.css";

function Navbar() {
  const { isLoggedIn, logOutUser } = useContext(AuthContext);

  return (
    <nav className="navbar">
      <Link to="/" className="navbar-logo">
        <img src={NearBiteLogo} alt="NearBite" />
      </Link>

      <div className="navbar-links">
        <Link to="/meals">Meals</Link>

        {isLoggedIn && (
          <>
            <Link to="/meals/create">Post food</Link>
            <Link to="/my-reservations">My reservations</Link>
            <Link to="/my-meal-reservations">Reservations on my meals</Link>
            <button className="signup-btn" onClick={logOutUser}>
              Logout
            </button>
          </>
        )}

        {!isLoggedIn && (
          <>
            <Link to="/login">Login</Link>
            <Link to="/signup" className="signup-btn">
              Sign up
            </Link>
          </>
        )}
      </div>
    </nav>
  );
}

export default Navbar;
