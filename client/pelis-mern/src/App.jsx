import axios from 'axios';
import { useEffect, useState } from 'react'
import { BrowserRouter,Routes,Route } from 'react-router-dom';
import Hero from './Hero';
import NoPage from './NoPage';
import SignIn from './SignIn';

function App() {
const [newArray,setArray]=useState([])
const [trailer,setTrailer]=useState("")
let [dependencias, setDependencias]=useState(0)
let[idTrailer,setIdTrailer]=useState("")

function prueba(){
 setDependencias(dependencias+1)
 console.log(dependencias)
}

  useEffect(()=>{ //useEffect para el llamado de la API
    async function llamado(){
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
      console.log("info ",info) 
    } catch (error) {
      console.error(error);
    }
  }llamado();
  },[dependencias]) //

  useEffect(()=>{ //useEffect para llamar al trailer de la API
  async function llamadoTrailer(){
    const options = {
      method: 'GET',
      url: `https://moviesdatabase.p.rapidapi.com/titles/${idTrailer}`,
      params: {
        info: 'trailer',
      },
      headers: {
        'X-RapidAPI-Key': '67f656a5b7mshe2db331fbc1afbap1ac1d4jsn2028ca1c89f4',
        'X-RapidAPI-Host': 'moviesdatabase.p.rapidapi.com'
      }
    };
    
    try {
      const infoTrailer = await axios.request(options)
       setTrailer(infoTrailer.data.results.trailer+"?autoplay=1&mute=1&loop=1");
      console.log("infoTrailer ",infoTrailer) 
      console.log("trailer",trailer)
        } catch (error) {
      console.error(error);
    }
  }llamadoTrailer();
  },[idTrailer]) //useEffect se actualiza por cada cambio de valor en variable idTrailer


  return (
    <>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Hero newArray={newArray} trailer={trailer} setTrailer={setTrailer} setIdTrailer={setIdTrailer}></Hero>}></Route>
          <Route path="*" element={<NoPage/>}></Route>
          <Route path="/signin" element={<SignIn/>}></Route>
        </Routes>
        <button onClick={prueba}>recargar</button>
      </BrowserRouter>
    </>
  );
}

export default App;
