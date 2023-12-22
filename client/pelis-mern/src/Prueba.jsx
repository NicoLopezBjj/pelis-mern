import {useState} from 'react'


const Prueba = () => {

    const [pelihero, setPelihero] = useState([])

    const loadPelihero = () => {
        fetch('http://localhost:3001/api/pelihero')
        .then(res => res.json())
        .then(allPeliHero => setPelihero(allPeliHero))
        
    }

    loadPelihero()

    return(
        <div>
            <h1>Listado de peliculas</h1>
            {pelihero.map(eachPeli =>{
                return(
                <article className=''>
                <h1>{eachPeli.nombreHero}</h1>
                <img className='imgHero' src={eachPeli.imagenHero}></img>
                </article>

            )})}
        </div>
    )

}

export default Prueba