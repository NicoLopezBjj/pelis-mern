import axios from "axios";
import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import '../../sketch.css'

function ProxEstrenos(){

    const [proxEstrenos,setProxEstrenos] = useState([])

    const months = ["January",
    "February",
    "March",
    "April",
    "May",
    "June",
    "July",
    "August",
    "September",
    "October",
    "November",
    "December"]

    useEffect(()=>{
        async function llamaProxEstrenos(){
            const options = {
                method:"GET",
                url:`https://moviesdatabase.p.rapidapi.com/titles`,
                params:{
                    info:"base_info",
                    list:"top_boxoffice_last_weekend_10",
                },
                headers: {
                    'X-RapidAPI-Key': '67f656a5b7mshe2db331fbc1afbap1ac1d4jsn2028ca1c89f4',
                    'X-RapidAPI-Host': 'moviesdatabase.p.rapidapi.com'
                }
            }

            try{
                const data = await axios.request(options)
                //console.log("Data API:", data)
                //console.log("Próximos Estrenos:", proxEstrenos)
                setProxEstrenos(data.data.results)
            }catch(err){ console.error(err) }
        } 
        llamaProxEstrenos()
    },[])
   // console.log("Próximos Estrenos:", proxEstrenos)
    return(
        <section class="px-5 mb-5">
            <div class="mb-5">
                <h4 class="text-uppercase text-light ms-4">Coming soon</h4>
            </div>
            <hr />
            <div class="proxPelis d-flex flex-wrap">
                {proxEstrenos.map((proxEstreno)=>{
                    let movieLink = `/movie/${proxEstreno.id}`
                    return <Link to={movieLink} style={{textDecoration:"none"}}>
                            <div class="movie mx-2 mb-4 p-4 position-relative" key={proxEstreno.id}>
                                <img src={proxEstreno.primaryImage === null ? "tba.jpg" : proxEstreno.primaryImage.url} alt="Movie IMG" class="mb-3" />
                                <p class="movie-title mb-2">{proxEstreno.titleText.text.length<25 ? proxEstreno.titleText.text : proxEstreno.titleText.text.slice(0,15) + "..."}</p>
                                <p class="movie-description m-0">{proxEstreno.runtime === null ? "???" : proxEstreno.runtime.seconds/60} min | <span className="text-uppercase">{proxEstreno.genres.genres[0].text}</span></p>
                                <div class="estrenos-fecha d-flex align-items-center position-absolute">
                                    <p class="prox-background text-light"><i class="fa-solid fa-calendar-days p-2"></i></p> 
                                    <p class="prox-background text-light py-1 ps-3 pe-4">{proxEstreno.releaseDate === null ? "TBA" : months[proxEstreno.releaseDate.month] + " " + proxEstreno.releaseDate.day}</p>
                                </div>
                            </div>
                        </Link>
                })}
            </div>
        </section>
    )
}

export default ProxEstrenos