import axios from 'axios';
import { useContext , useEffect , useState} from 'react';
import { UserContext } from '../UserContext';
import NavBar from './NavBar';
import '../sketch.css'
import {NavLink, Link, useNavigate} from "react-router-dom"

function Header(){
  const {user , setUser} = useContext(UserContext)
  const [loggedOut,setLoggedOut] = useState(false) 
  const {profileName} = useContext(UserContext)
  const navigate = useNavigate()
   // Al cargar el componente, verificamos si la información del usuario está en localStorage
   useEffect(() => {
    const savedUser = localStorage.getItem('user');
    if (savedUser) {
      setUser(JSON.parse(savedUser));
    }
  }, []);

  // Cuando el usuario cambia, lo guardamos en localStorage
  useEffect(() => {
    if (user) {
      localStorage.setItem('user', JSON.stringify(user));
    } else {
      localStorage.removeItem('user');
    }
  }, [user]);

   // Busca los datos de autenticacion de Google
useEffect(() => {
  async function googleAuthentication() {
    if(user || loggedOut) {
      return
    }
    try{
    const response = await axios.get('http://localhost:3001/auth/google/user', { withCredentials: true });
    if (response.data.user) {
      setUser(response.data.user);
      console.log('userGoogle front', response.data.user)
    } else {
      setUser(null);
    }  
    } catch (e) {
      console.log('el error de google es', e)
    }
  }
  googleAuthentication();
}, [user, loggedOut]);

  const LogOut = async () => {
    localStorage.removeItem('user')
    const data = await axios.request({method:"GET",url:"http://localhost:3001/logout"})
    console.log('vengo de logout',data)
    setUser(false) //importante setear a user en falso así se borra el usuario en el front
    navigate("/signin")
  }

  return (
    <>
    <header class="d-flex justify-content-between py-4 px-5">
            <img src="/logo.png" alt="Movies Hub" class="logo"/>
            <div class="header-content d-flex justify-content-evenly align-items-center">
             <NavBar></NavBar>
                <a href="#search"><button class="btn-search"><i class="bi bi-search px-5"></i></button></a>
                { user && profileName ?(
                  <div className='dropdown signBtn'>
                    <button className='btn px-4 colorButton ms-2 dropdown-toggle' type="button" id="dropdownMenuButton" data-bs-toggle="dropdown" aria-haspopup="true" aria-expanded="false">{profileName === null ? user.name : profileName}</button>
                    <div className="dropdown-menu" aria-labelledby="dropdownMenuButton">
                      <Link to="/profiles" className="dropdown-item hoverModal">Profiles</Link>
                      <button onClick={LogOut} className="dropdown-item hoverModal" >Logout</button>
                     </div>
                  </div>
                ) : ( <NavLink to="/signin"><button class="btn px-4 colorButton ms-2 signBtn">Sign in</button></NavLink>
                )} 
            </div>
            <div className="burger">
              <div class="dropdown">
                <button class="btn colorButton dropdown-toggle" type="button" id="dropdownMenuButton" data-bs-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
                  <i class="bi bi-list"></i>
                </button>
                <div class="dropdown-menu" aria-labelledby="dropdownMenuButton">
                  <NavLink to="/" className="sacarEnlace hoverEnlace nav-link px-4 py-1">Home</NavLink>
                  <NavLink to="/mylist" className="sacarEnlace hoverEnlace nav-link px-4 py-1">My List</NavLink>
                  <NavLink to="/movies" className="sacarEnlace hoverEnlace nav-link px-4 py-1">Movies</NavLink>
                  <NavLink to="/news" className="sacarEnlace hoverEnlace nav-link px-4 py-1">News</NavLink>
                  <div class="dropdown-divider"></div>
                  { user && profileName ?(
                  <>
                    <Link to="/profiles" className="dropdown-item hoverModal px-4">Profiles</Link>
                    <button onClick={LogOut} className="dropdown-item hoverModal px-4" >Logout</button>
                  </>
                  ) : ( <NavLink to="/signin"><button class="px-4">Sign in</button></NavLink>
                  )}
                </div>
            </div>
            </div>
        </header>
  
    </>
  );
}

export default Header;
