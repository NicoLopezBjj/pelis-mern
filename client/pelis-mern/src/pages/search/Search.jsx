import { Link, useSearchParams } from "react-router-dom"
import axios from "axios"
import {useState,useEffect,useContext} from "react"
import { UserContext } from "../../UserContext"
import Header from "../../components/Header"

function Search(){
    const {busqueda, setBusqueda} = useContext(UserContext)
    const [next,setNext] = useState(null)
    const [resultados, setResultados] = useState([])
    const parse = JSON.parse(localStorage.getItem('query'));
    setBusqueda(parse)
    

    useEffect(()=>{
        async function resultadoBusqueda(){
            console.log(busqueda)
            const options = {
                method:"GET",
                url:`https://moviesdatabase.p.rapidapi.com/titles/search/title/${busqueda}`,
                params:{
                    titleType:"movie",
                    limit:50
                },
                headers: {
                    'X-RapidAPI-Key': '67f656a5b7mshe2db331fbc1afbap1ac1d4jsn2028ca1c89f4',
                    'X-RapidAPI-Host': 'moviesdatabase.p.rapidapi.com'
                }
            }
            try{
                const data = await axios.request(options)
                console.log(data)
                setResultados(data.data.results)
                setNext(data.data.next)
            }catch(err){ console.error(err) }
        } 
    resultadoBusqueda()
    },[busqueda])
    console.log(resultados)
    return(
        <>
            <Header/>
            <h1 className="text-light">Búsqueda:</h1>
                {resultados.length > 0 ? 
                <div className="d-flex flex-wrap text-danger">
                    {resultados.map(resultado => {
                    let movieLink = `/movie/${resultado.id}`
                    return <Link to={movieLink} style={{textDecoration:"none"}}>
                            <div className="movie mx-2 mb-4 p-4">
                                <img src={resultado.primaryImage == null ? "/tba.jpg" : resultado.primaryImage.url}></img>
                                <p className="movie-title mb-2">{resultado.titleText.text.length<20 ? resultado.titleText.text : resultado.titleText.text.slice(0,15) + "..."}</p>
                            </div>
                        </Link>
                    })}
                </div> 
            : <div class="mx-4 d-flex justify-content-center">
                    <img src="/icon.png" alt="" className="loading-animation"></img>
                </div>}
            
        </>
    )
}

export default Search