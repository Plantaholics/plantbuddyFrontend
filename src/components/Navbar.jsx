import {Link} from "react-router-dom";


function Navbar(){

    return (
        <div>
        <nav>
            <Link to="/">
                <button>Home</button>
            </Link>
            <Link to="/plants">
            <button>Plants</button>
            </Link>

            <Link to="/signup">
                {" "}
                <button>Join us</button>
            </Link>

            <Link to="/login">
                <button>Login</button>
            </Link>

            <button>Log Out</button>

        </nav>
        </div>
    );
}

export default Navbar;