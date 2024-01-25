import axios from 'axios';
import { useEffect, useState } from 'react'
import { BrowserRouter,Routes,Route } from 'react-router-dom';
import { UserContext } from './UserContext';
import NoPage from './pages/noPage/NoPage';
import SignIn from './pages/signin/SignIn';
import SignUp from './pages/signup/SignUp';
import Home from './pages/home/Home';
import Movie from './pages/movie/Movie';
import Search from './pages/search/Search';
import Profiles from "./pages/profile/Profiles"
import CreateProfile from './pages/profile/CreateProfile';
import EditProfile from './pages/profile/EditProfile';
import MyList from './pages/Mylist/MyList';


function App() {
const [dataSlide, setDataSlide] = useState([]);
const [user, setUser] = useState(null);
const [busqueda,setBusqueda]=useState("")
const [loggedOut,setLoggedOut] = useState(false)
const [profileName,setProfileName] = useState(null)
const [profileId, setProfileId] = useState(null)
const [list, setList] = useState([])

  useEffect(()=>{ //useEffect para el llamado de la API
      async function llamadoHero(){
        axios.get('https://pelis-mern-server-five.vercel.app/',{ withCredentials: true })
        .then(response => setDataSlide(response.data.arraySlide))
        .catch(error => console.error('Error al obtener datos:', error));
        }llamadoHero();
      },[]) 


  return (
    <>
    <UserContext.Provider value={{user, setUser, busqueda, setBusqueda, profileName , setProfileName, profileId, setProfileId, list, setList}}>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Home dataSlide={dataSlide}/>}></Route>
          <Route path="*" element={<NoPage/>}></Route>
          <Route path="/signin" element={<SignIn/>}></Route>
          <Route path="/signup" element={<SignUp/>}></Route>
          <Route path="/search" element={<Search/>}></Route>
          <Route path="/movie/:id" element={<Movie/>}></Route>
          <Route path="/profiles" element={<Profiles/>}></Route>
          <Route path="/edit-profile/:id" element={<EditProfile/>}></Route>
          <Route path="/mylist" element={<MyList/>}></Route>
        </Routes>
      </BrowserRouter>
    </UserContext.Provider>
    </>
  );
}

export default App;