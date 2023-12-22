import axios from "axios"
import {useState, useEffect} from "react"
import { useParams } from "react-router-dom"
import Header from "../../components/Header"
import Footer from "../../components/Footer"
import '../../sketch.css'

function Movie(){
    const [movie,setMovie] = useState({})
    const [last,setLast] = useState([])
    const {id} = useParams()
    useEffect(()=>{
        async function callMovie(){
            const options = {
                method: 'GET',
                url: `https://moviesdatabase.p.rapidapi.com/titles/${id}`,
                params: {
                    info: 'base_info',
                  },
                headers: {
                  'X-RapidAPI-Key': '67f656a5b7mshe2db331fbc1afbap1ac1d4jsn2028ca1c89f4',
                  'X-RapidAPI-Host': 'moviesdatabase.p.rapidapi.com'
                }
              };
              
              try {
                const info = await axios.request(options)
                const genreArray = info.data.results.genres.genres
                console.log(info.data.results)
                setMovie(info.data.results)
                setLast(genreArray[genreArray.length-1])
              } catch (error) {
                console.error(error);
              }
        }

        callMovie()
    },[])

    console.log(movie)
    console.log(last)

    return(
        <>
           <Header/>
           {movie.titleText ? 
           <section className="mx-4 my-3">
                <div className="container-fluid d-flex justify-content-between movie1">
                    <img src={movie.primaryImage === null ? "/bigtba.jpg" : movie.primaryImage.url} alt="" onError={(e)=> {e.target.onerror = null; e.target.src = "/couldnt_load.jpg"}} />
                    <div className="text-light movie1-info">
                        <h1 className="mx-3 mt-3 mb-2">{movie.titleText.text}</h1>
                        <h2 className="text-danger mx-3 mb-3">{movie.releaseYear === null ? "TBA" : movie.releaseYear.year} | {movie.runtime === null ? "???" : movie.runtime.seconds/60} min</h2>
                        <h3 className="mx-3 mb-3">{
                        movie.genres.genres.map(genre => {
                            if(genre.text === last.text){
                              return genre.text
                            }else{
                              return genre.text + " | "
                            }
                        })}</h3>
                        <div className="mx-3 mb-3 d-flex align-items-center">
                          <h3 className="pe-3"><span className="text-warning">Rating:</span> <b>{movie.ratingsSummary.aggregateRating}</b></h3>
                          <h6><b className="mx-1">(</b>Votos: {movie.ratingsSummary.voteCount}<b className="mx-1">)</b></h6>
                        </div>
                        <h4 className="mx-3 my-3">{movie.plot.plotText.plainText}</h4>
                    </div>
                </div>
            <Footer/>
           </section> 
           : <div class="mx-4 d-flex justify-content-center">
              <img src="/icon.png" alt="" className="loading-animation"></img>
            </div>}
        </>
    )
}

export default Movie