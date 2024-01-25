import axios from 'axios';
import { useContext, useEffect, useState } from 'react';
import Header from '../../components/Header';
import '../../sketch.css'
import { UserContext } from '../../UserContext';
import { Link } from 'react-router-dom';

function MyList(){
  const {user, profileId, profileName, list, setList} = useContext(UserContext)
  useEffect(()=>{
    async function getList(){
      try{
        const response = await axios.post("https://pelis-mern-server-five.vercel.app/lists/get-my-list", {id:user._id, profId:profileId}, {withCredentials:true})
        console.log(response)
        if(response.data.list.length > 0){
          console.log("hay")
          setList(response.data.list)
        }
      }catch(err){console.log(err)}
    }
    getList()
  },[])
  console.log(list)
  return (
    <>
        <Header />
        <h1 className='text-light ms-3 text-center'>My List - {profileName}</h1>
        {list != [] ? 
        <>
          <div className="d-flex flex-wrap px-5 mb-5">
          {list.length > 0 ? list.map((mov)=>{
            let movieLink = `/movie/${mov.id}`
            return(
              <Link to={movieLink} style={{textDecoration:"none"}}>
                  <div class="movie mx-2 mb-4 p-4 position-relative" key={mov.id}>
                      <img src={mov.primaryImage === null ? "tba.jpg" : mov.primaryImage.url} alt="Movie IMG" class="mb-3" />
                      <p class="movie-title mb-2">{mov.titleText.text.length<25 ? mov.titleText.text : mov.titleText.text.slice(0,15) + "..."}</p>
                      <p class="movie-description m-0">{mov.runtime === null ? "???" : mov.runtime.seconds/60} min | <span className="text-uppercase">{mov.genres.genres[0].text}</span></p>
                  </div>
              </Link>
            )
          }) : <h3 className="text-light">There are no movies in your list. Consider adding some.</h3>}
          </div>
        </>
          : <div class="mx-4 d-flex justify-content-center">
          <img src="/icon.png" alt="" className="loading-animation"></img>
        </div>}
    </>
  );
}

export default MyList;