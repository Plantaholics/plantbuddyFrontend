import { Link, useNavigate } from "react-router-dom";

function Navbar() {
  const auth = localStorage.getItem("authToken");
  const navigate = useNavigate();
  const logout = () => {
    localStorage.removeItem("authToken");
    navigate("/");
  };

  return (
    <div>
      <nav>
        <Link to="/">
          <button>Home</button>
        </Link>
        <Link to="/plants">
          <button>Plants</button>
        </Link>

        {!auth && (
          <Link to="/signup">
            <button>Join us</button>
          </Link>
        )}


        {auth ? (
          <Link onClick={logout} to="/">
            <button>Log out</button>
          </Link>
        ) : (
          <Link to="/login">
            <button>Log in</button>
          </Link>
        )}
      </nav>
    </div>
  );
}

export default Navbar;
