import { useEffect, useState } from 'react';
import React from 'react';
import '../../sketch.css'
import '../../responsive1.css'
import Header from '../../components/Header';

const functionSlide = async(setSlide,slide)=>{
    await new Promise(() => setTimeout(()=>{
       setSlide(slide+1)
    }, 6000));
} 

function Hero({ dataSlide }){
    const [trailer,setTrailer]=useState("")
    const [key,setKey]=useState(true)
    const [num, setNum]=useState(0)
    const [hover, setHover] = useState(true)
    const [viewTrailer,setViewTrailer]=useState(false)
    const [slide,setSlide]=useState(0)

    useEffect(()=>{
            if (key && num < 6){
                setNum(num+1)
            }else{
                setNum(1)
            }
        
    },[slide])

    if (key){
        functionSlide(setSlide,slide)
    }
   
    const changeMovie=async (event)=>//cambio de numero: setNum es la más importante!! renderiza todo lo que contenga el valor del index elegido
        {
        setKey(false)
        const number =Number(event.target.textContent) 
        setNum(number)
        setViewTrailer(false)
    };

   
        
    const changeMovieMinus = ()=>{//bajar de numero -flecha izquierda del slide <-
        setKey(false)
        if(num != 1){
            setNum(num-1)
            setViewTrailer(false)
        }  
    };

    const changeMoviePlus = ()=>{//subir de numero -flecha derecha del slide ->
        setKey(false)
        if (num != 6){
            setNum(num+1)
            setViewTrailer(false)
        }  
    };

    const handleHover = ()=>{//desactiva las propiedades del numero con hover estatico
        setHover(false)
    };

    const handleUnhover = ()=>{//vuelve activar las propiedades del numero con hover estatico
       setHover(true)
    };

    const playTrailer=(e)=>{//apertura y busqueda del trailers
        setKey(false)
        let valor = e.target.id
        setTrailer(valor)
        setViewTrailer(true)
    }
    const closeModal=()=>{//cierre del trailer
        setViewTrailer(false)
        setTrailer("")
    }
    const background = {//propiedades para el background del hero
        backgroundImage: dataSlide.length>0?`linear-gradient(to bottom, transparent 0%, #000000 95%),url(${num==0?null:dataSlide[num-1].imagenHero}) `:null,
        backgroundSize:'cover',
        backgroundPosition:'center'
    };

    const hoverAuto ={//hover para slide
        fontSize:"2rem",
        color:"var(--red)",
        marginTop:"0.2em"
    };
    
    return (
        <div>
        {dataSlide.length > 0 ?
            <section style={background}>
            {/* modal para trailer */}
            {
            dataSlide.map((item, index) => (index+1 == num 
                ? 
                <div key={item._id} style={{display:num == index + 1 && viewTrailer ? "flex" : "none",width:"100%",height:"100%", position:"absolute", zIndex:"200",justifyContent:"center", alignItems:"center"}}>
                        <button style={{color:"white",fontSize:"2rem",position:"absolute",top:"2.2em",right:"1.3em"}} onClick={closeModal}><i class="bi bi-x-lg"></i></button>
                        <iframe class="youtube-video" src={trailer} frameborder="0" allowfullscreen style={{width:"100vw",height:"100vh",alignSelf:"center"}}></iframe>
                </div>
                :
                <p key={item.id} style={{display:num === index + 1 && viewTrailer?"flex":"none"}}>no hay trailer</p>
            ))}
            <Header></Header>
            <section className="hero position-relative px-5">
                {dataSlide.map((item, index) => (index <= 5?
                    <>
                    <div className="hero-movie" style={{display:num === index + 1?"block":"none"}} key={item.id+"b"}>
                      <div className="hero-description d-flex align-items-center position-absolute">
                        <button className="btn px-4 colorButton ms-2">Book Now</button>
                        <p>{item.fechaHero}<br /> IMAX 3D</p>
                      </div>
                      <div className="hero-trailer position-absolute">
                        <button  className="btn-trailer"><i id={item.trailerHero} onClick={playTrailer} className="bi bi-play-fill"></i></button>
                        <p >Watch Trailer</p>
                      </div>
                    </div>
                  
                  <div key={item.id+"c"} className="hero-content">
                    <div className="social-media position-absolute">
                      <a href="#facebook"><i className="bi bi-facebook"></i></a>
                      <a href="#twitter"><i className="bi bi-twitter-x"></i></a>
                      <a href="#instagram"><i className="bi bi-instagram"></i></a>
                    </div>
                    { index==0?
                 
                        <div key={item.id+'d'} className="hero-slide d-flex position-absolute">
                            <button onClick={changeMovieMinus}><i className="bi bi-arrow-left"></i></button>
                            <div className="hero-slide-page d-flex" > 
                            {dataSlide.map((item, index) => (index <= 5?
                                <p
                                key={item.id+"chil_d"}
                                onMouseEnter={handleHover}
                                onMouseLeave={handleUnhover}
                                style={num === index + 1 && hover ? hoverAuto : null}
                                id={item._id}
                                onClick={changeMovie}
                                >
                                <a className="page-link" href="#">{index <= 5 ? `0${index + 1}` : null}</a>
                                </p>:null
                                ))}
                        </div>
                        <button onClick={changeMoviePlus}><i className="bi bi-arrow-right"></i></button>
                      </div>:null
                      }
                    </div>
                    </>:null
                ))}
            </section>
            </section>
            : <p>Not Found!</p> }
        </div>
      );
}
export default Hero;