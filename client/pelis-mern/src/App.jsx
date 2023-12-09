import axios from 'axios';
import { useEffect, useState } from 'react'
import { BrowserRouter,Routes,Route } from 'react-router-dom';
import { UserContext } from './UserContext';
import NoPage from './NoPage';
import SignIn from './SignIn';
import SignUp from './SignUp';
import Home from './Home';
import Movie from './Movie';
import Search from './Search';
import PruebaAuth from './PruebaAuth';

function App() {
const [newArray,setArray]=useState([])
const [dataSlide, setDataSlide] = useState([]);
const [user, setUser] = useState(null);
const [busqueda,setBusqueda]=useState("")
const linkStyle = {
  textDecoration:"none"
}

  useEffect(()=>{ //useEffect para el llamado de la API
    async function llamado(){
      console.log('effect')
        const options = {
          method: 'GET',
          url: 'https://moviesdatabase.p.rapidapi.com/titles/random',
          params: {
            info: 'base_info',
            list: 'top_boxoffice_200'
          },
          headers: {
            'X-RapidAPI-Key': '67f656a5b7mshe2db331fbc1afbap1ac1d4jsn2028ca1c89f4',
            'X-RapidAPI-Host': 'moviesdatabase.p.rapidapi.com'
          }
        };
        
        try {
          const info = await axios.request(options)
           setArray(info.data.results); //se pushean los datos fetcheados de la API al array del useState
        } catch (error) {
          console.error(error);
        }
      
    }llamado();

  async function llamadoHero(){
    axios.get('http://localhost:3001/')
    .then(response => setDataSlide(response.data.arraySlide))
    .catch(error => console.error('Error al obtener datos:', error));
    }llamadoHero();
  },[]) 

  return (
    <>
    <UserContext.Provider value={{user, setUser, busqueda, setBusqueda, linkStyle}}>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Home dataSlide={dataSlide} newArray={newArray}/>}></Route>
          <Route path="*" element={<NoPage/>}></Route>
          <Route path="/signin" element={<SignIn/>}></Route>
          <Route path="/signup" element={<SignUp/>}></Route>
          <Route path="/search" element={<Search/>}></Route>
          <Route path="/movie/:id" element={<Movie/>}></Route>
          <Route path="/pruebaauth" element={<PruebaAuth/>}></Route>
        </Routes>
      </BrowserRouter>
    </UserContext.Provider>
    </>
  );
}

export default App;