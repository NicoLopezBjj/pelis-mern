import {NavLink} from "react-router-dom"
import '../sketch.css'
import '../responsive1.css'

function NavBar(){

  const style={
    textDecoration:"none",
    color:"white",
    padding:"0 1.5rem",
  }
  
  return (
    <>
      <nav className="navbar navbar-expand-lg mx-6 nav-md"> 
          <ul className="navbar-nav">
              <li className="nav-item mx-2"><NavLink to="/" className="sacarEnlace hoverEnlace nav-link px-4 text-light">Home</NavLink></li>
              <li className="nav-item mx-2"><NavLink to="/mylist" className="sacarEnlace hoverEnlace nav-link px-4 text-light">My List</NavLink></li>
              <li className="nav-item mx-2 nav-extra"><NavLink to="/movies" className="sacarEnlace hoverEnlace nav-link px-4 text-light">Movies</NavLink></li>
              <li className="nav-item mx-2 nav-extra"><NavLink to="/news" className="sacarEnlace hoverEnlace nav-link px-4 text-light">News</NavLink></li>
          </ul>
      </nav>
    </>
  );
}

export default NavBar;