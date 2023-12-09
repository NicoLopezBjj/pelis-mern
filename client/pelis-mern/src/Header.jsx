import { useContext} from 'react';
import { UserContext } from './UserContext';
import NavBar from './NavBar';
import './sketch.css'
import {NavLink} from "react-router-dom"

function Header(){
  const {user} = useContext(UserContext)
  
  return (
    <>
    <header class="d-flex justify-content-between py-4 px-5">
            <img src="/logo.png" alt="Movies Hub" class="logo"/>
            <div class="header-content d-flex justify-content-evenly align-items-center">
             <NavBar></NavBar>
                <a href="#search"><button class="btn-search"><i class="bi bi-search px-5"></i></button></a>
                { user ?(
                  <button className='btn px-4 colorButton ms-2'>{user.name}</button>
                ) : ( <NavLink to="/signin"><button class="btn px-4 colorButton ms-2">Sign in</button></NavLink>
                )} 
            </div>
        </header>
  
    </>
  );
}

export default Header;