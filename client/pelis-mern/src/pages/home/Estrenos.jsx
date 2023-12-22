import { useEffect, useState, useContext } from "react";
import { Link } from "react-router-dom"
import { UserContext } from "../../UserContext";
import '../../sketch.css'
import { llamaEstrenos,llamaTrailer } from "./logicaEstreno";

function Estrenos(){
    const [likes,setLikes] = useState([])
    const [IdllaveTrailer,setIdLlaveTrailer] = useState(null)
    const [llaveTrailer,setLlaveTrailer] = useState(false)
    const [trailer,setTrailer] =useState("")
    const [estrenos,setEstrenos]=useState([])
    const [pagina,setPagina]=useState(1)
    const [colorButton,setColorButton]=useState("Action")
    const {busqueda, setBusqueda} = useContext(UserContext)
    const q = new URLSearchParams()
    
    useEffect(()=>{
        if(llaveTrailer){
            llamaTrailer(setTrailer,IdllaveTrailer)
        }else{
            llamaEstrenos(pagina,setEstrenos,colorButton)
        }
    },[pagina,colorButton,IdllaveTrailer])

    
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

    const handleHoverEstrenos = async (e)=>{
            let index =e.target.dataset.id
            if(index== ""){
                index = null
                setIdLlaveTrailer(index)
            }else{
                setIdLlaveTrailer(index)
            }
            setLlaveTrailer(true)
    };

    const handleUnhoverEstrenos = ()=>{
        setIdLlaveTrailer(null)
        setLlaveTrailer(false)
        setTrailer("")
    };

    const meGusta = (event)=>{
        let numero =event.target.dataset.id
        if (!likes.includes(numero)) {
            setLikes(prevLikes => [...prevLikes, numero]);
        }else{
            const nuevoArray = likes.filter(item => item !== numero);
            setLikes(nuevoArray);
        }
    };

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
                            <Link to={movieLink} style={{textDecoration:"none"}}
                                    data-id={estreno.id} 
                                    onMouseEnter={handleHoverEstrenos}
                                    onMouseLeave={handleUnhoverEstrenos}  
                                >
                            {IdllaveTrailer == estreno.id
                                ?  
                                <div className={IdllaveTrailer? 'styleTrailer' :"movie mx-2 mb-4 p-4"}>
                                    <iframe src={trailer} allowfullscreen style={{width: '100%', height: '100%',alignSelf:"flex-start", alignItems:'flex-start',margin:'0%'}}></iframe>
                                    <p className="movie-title mb-2 m-2">{estreno.titleText.text}</p>
                                    <div className="d-flex justify-content-between p-2">
                                        <div className="d-flex justify-content-between mr-5">
                                            <p class="movie-description" style={{marginRight:'10px'}}>{estreno.releaseYear.year}  </p>
                                            <p class="movie-description">{estreno.runtime.seconds/60} min</p>
                                        </div>
                                        <Link><i onClick={meGusta} data-id={estreno.id} class="fa-solid fa-heart"style={{color:likes.includes(estreno.id)? "red" : "white",marginRight:'20px'}}></i></Link>
                                    </div>
                                    <p class="movie-description m-0 p-2">{estreno.plot.plotText.plainText<30 ? estreno.plot.plotText.plainText : estreno.plot.plotText.plainText.slice(0,115) + "..."}</p>
                                </div>  
                                : 
                                <div className="movie mx-2 mb-4 p-4" >       
                                    <img src={estreno.primaryImage.url} 
                                    alt="Movie IMG" 
                                    onError={(e)=> {e.target.onerror = null; e.target.src = "/couldnt_load.jpg"}} 
                                    className="mb-3"
                                    />
                                    <p className="movie-title mb-2">{estreno.titleText.text.length<20 ? estreno.titleText.text : estreno.titleText.text.slice(0,15) + "..."}</p>
                                    <p class="movie-description m-0">{estreno.runtime.seconds/60} min | <span className="text-uppercase">{colorButton}</span></p>
                                </div>
                                 }
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