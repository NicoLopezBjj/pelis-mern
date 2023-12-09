import axios from "axios";
import { useEffect, useState, useContext } from "react";
import { Link, useSearchParams } from "react-router-dom"
import { UserContext } from "./UserContext";
import "./sketch.css"

function Estrenos(){

    const [estrenos,setEstrenos]=useState([])
    const [pagina,setPagina]=useState(1)
    const [colorButton,setColorButton]=useState("Action")
    const {busqueda, setBusqueda, linkStyle} = useContext(UserContext)
    const q = new URLSearchParams()

    useEffect(()=>{
        async function llamaEstrenos(){
            const options = {
                method:"GET",
                url:`https://moviesdatabase.p.rapidapi.com/titles?page=${pagina}`,
                params:{
                    info:"base_info",
                    list:"top_boxoffice_200",
                    genre: colorButton,
                    limit:15
                },
                headers: {
                    'X-RapidAPI-Key': '67f656a5b7mshe2db331fbc1afbap1ac1d4jsn2028ca1c89f4',
                    'X-RapidAPI-Host': 'moviesdatabase.p.rapidapi.com'
                }
            }

            try{
                const data = await axios.request(options)
            //    console.log("Data API:", data)
               // console.log("Estrenos:", estrenos)

                if (pagina > 1){
                     setEstrenos(prevEstrenos => [...prevEstrenos, ...data.data.results]) //setEstrenos pasa del estado anterior del useState (prevEstrenos) a un nuevo estado que suma todos los valores del anterior más todos los valores del nuevo (con spread operator!)
                }else{setEstrenos(data.data.results)
                }
            }catch(err){ console.error(err) }
        } 
        
        llamaEstrenos()
    },[pagina,colorButton])

    //console.log("Estrenos:", estrenos)
   // console.log("Página:", pagina)

   /* let estrenosFiltrados = estrenos.filter((estreno)=>{
        return estreno.titleText.text.toLowerCase().includes(busqueda.toLowerCase())
    })

    let estrenosFiltradosPorGenero = estrenosFiltrados.filter((estrenoFiltrado)=>{
        return estrenoFiltrado.genres.genres[0].text === colorButton //filtra teniendo en cuenta el valor de colorButton
    })*/

    const verMas = (e) => {
        setPagina(pagina+1)
        if(pagina === 3){ //ojo con este número! es el número anterior a la última actualización de página (si hay cuatro páginas, acá es pagina === 3)
            e.target.style.color="darkgray"
            e.target.style.opacity="50%"
            e.target.setAttribute("disabled","")
        }
    }

    const search = () => {
        q.set("search",busqueda)
        let query = q.get("search")
        localStorage.setItem('query', JSON.stringify(busqueda));
        return query
    }

    return(
        <section className="p-5" id="search">
            <div className="d-flex justify-content-between mb-5 position-relative">
                <h4 className="text-uppercase text-light ms-4">Opening this week</h4>
                <input type="text" className="estrenos-search me-4 ps-3 bg-transparent border border-1 border-light rounded rounded-2 text-light" placeholder="Search" value={busqueda} onChange={(e)=>{setBusqueda(e.target.value)}}/>
                <button className="btn-search-absolute position-absolute" onClick={search} disabled={busqueda === "" ? "disabled" : ""}><Link to={`/search?query=${search()}`}><i className="btn-search-absolute bi bi-search px-5"></i></Link></button>
            </div>
            <hr />
            <div class="pt-4 pb-5">
                <button className={colorButton === "Action" ? "btn px-4 btn-dark colorButton ms-2 text-light" : "btn px-4 btn-dark ms-2 text-light"} value="Action" onClick={(e)=>{setColorButton(e.target.value);setPagina(1)}}>Action</button>
                <button className={colorButton === "Comedy" ? "btn px-4 btn-dark colorButton ms-2 text-light" : "btn px-4 btn-dark ms-2 text-light"} value="Comedy" onClick={(e)=>{setColorButton(e.target.value);setPagina(1)}}>Comedy</button>
                <button className={colorButton === "Drama" ? "btn px-4 btn-dark colorButton ms-2 text-light" : "btn px-4 btn-dark ms-2 text-light"} value="Drama" onClick={(e)=>{setColorButton(e.target.value);setPagina(1)}}>Drama</button>
                <button className={colorButton === "Adventure" ? "btn px-4 btn-dark colorButton ms-2 text-light" : "btn px-4 btn-dark ms-2 text-light"} value="Adventure" onClick={(e)=>{setColorButton(e.target.value);setPagina(1)}}>Adventure</button>
                <button className={colorButton === "Animation" ? "btn px-4 btn-dark colorButton ms-2 text-light" : "btn px-4 btn-dark ms-2 text-light"} value="Animation" onClick={(e)=>{setColorButton(e.target.value);setPagina(1)}}>Animation</button>
            </div>
            <div class="d-flex flex-wrap">
                { estrenos.length>0 ? 
                    estrenos.map((estreno,index)=>{ 
                        let movieLink = `/movie/${estreno.id}`
                        return (
                            <Link to={movieLink} style={linkStyle}>
                                <div className="movie mx-2 mb-4 p-4" key={estreno.id} >
                                    <img src={estreno.primaryImage.url} 
                                    alt="Movie IMG" 
                                    onError={(e)=> {e.target.onerror = null; e.target.src = "/couldnt_load.jpg"}} 
                                    className="mb-3"
                                     />
                                    <p className="movie-title mb-2">{estreno.titleText.text.length<20 ? estreno.titleText.text : estreno.titleText.text.slice(0,15) + "..."}</p>
                                    <p class="movie-description m-0">{estreno.runtime.seconds/60} min | <span className="text-uppercase">{colorButton}</span></p>
                                </div>
                            </Link>
                        )
                    })
                : <h2 className="p-5 text-light">Lo sentimos, en este momento no hay nuevos estrenos.</h2>}
            </div>
            <button className="ver-mas me-5" onClick={(e)=>{verMas(e)}}>More...</button>
        </section>
    )
}

export default Estrenos