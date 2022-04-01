import { Outlet, Link } from "react-router-dom";

const Layout = () => {
  return (
    <>
      <nav>
        <ul className="nav">
          <li className="nav-item">
            <Link className="nav-link" to="/">Home</Link>
            </li>
          <li className="nav-item">
            <Link className="nav-link" to="/login">Login</Link>
            </li>
            </ul>
      </nav>

      <Outlet />
    </>
  )
};

export default Layout;
