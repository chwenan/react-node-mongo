import {Link} from "react-router-dom";

const Navbar =() => {
    return(
        <nav>
            <div>
                <Link to ="/">CRUD</Link>
                <dir>
                <ul>
                  <li>
                    <Link to ="/add">Add User</Link>
                  </li>
                </ul>
                </dir>
            </div>
        </nav>
    );
};
export default Navbar;