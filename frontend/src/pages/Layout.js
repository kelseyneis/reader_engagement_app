import { Outlet, Link } from "react-router-dom";

const Layout = () => {
  return (
    <>
      <nav>
        <ul className="nav">
          <li className="nav-item"><Link className="nav-link" to="/">Home</Link></li>
          <li className="nav-item"><Link className="nav-link" to="/login">Login</Link></li>
          <li className="nav-item"><Link className="nav-link" to="/highlight">Highlight</Link></li>
          <li className="nav-item"><Link className="nav-link" to="/data/schoolmistress">Schoolmistress Data</Link></li>
          <li className="nav-item"><Link className="nav-link" to="/data/expensivelessons">Expensive Lessons Data</Link></li>
        </ul>
      </nav>
      <Outlet />
    </>
  )
};

export default Layout;
