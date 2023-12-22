import axios from "axios";
import { useContext, useEffect, useState } from "react";
import Header from '../../components/Header';
import { Link, useNavigate } from "react-router-dom"
import { UserContext } from "../../UserContext";

function Profiles(){
    const {user} = useContext(UserContext)
    const navigate = useNavigate()
    const [profileMenu, setProfileMenu] = useState(true)
    const [profileCreator, setProfileCreator] = useState(false)
    const [profileEditor, setProfileEditor] = useState(false)
    const [profiles, setProfiles] = useState([]);
    const [error, setError] = useState(null)

    const [name,setName] = useState("")
    const [image,setImage] = useState("/blank_user.png")
    useEffect(()=>{
        async function obtainProfiles(){
            const data = await axios.request({method:"GET",url:"http://localhost:3001/profiles",withCredentials:true})
            console.log(data.data)
            setProfiles(data.data)
        }
        obtainProfiles()
    async function avatar (){
        const options = {
            method: 'GET',
            url: 'https://username-profile-picture-generator.p.rapidapi.com/user/exampleusername',
            params: {bold: 'true'},
            headers: {
              'X-RapidAPI-Key': '67f656a5b7mshe2db331fbc1afbap1ac1d4jsn2028ca1c89f4',
              'X-RapidAPI-Host': 'username-profile-picture-generator.p.rapidapi.com'
            }
          };
          
          try {
              const response = await axios.request(options);
              console.log(response.data);
          } catch (error) {
              console.error("este es el error",error);
          }
    }
    avatar()

    },[])

    const createProfile = ()=>{
        setProfileMenu(false)
        setProfileCreator(true)
    }
    const editProfile = ()=>{
        setProfileMenu(false)
        setProfileEditor(true)
    }
    const exit = ()=>{
        if(profileCreator){
            setProfileCreator(false)
        }else if(profileEditor){
            setProfileEditor(false)
        }
        setProfileMenu(true)
    }

    const postProfile = async (e)=>{
        e.preventDefault()
        if(name === ""){
            setError(true)
        }else{
            await axios.post("http://localhost:3001/create-profile",{
            id:user._id,
            name:name,
            image:image
            }, {withCredentials: true})
            .then(response => ()=>{
                console.log(response.data)
            })
            .catch(error => console.log(error))
            navigate("/")
        }
        
    }

    return(
        <>
            <Header/>
            {profileMenu && <>
                <div className="d-flex justify-content-center text-light">
                    <h1>Who's watching?</h1>
                </div>
                {profiles.length > 0 ? 
                <div className="d-flex flex-wrap justify-content-center">
                {
                    profiles.map((e)=>{
                        return(
                            <div className='m-5' key={e._id}>
                                <img onError={(e)=> {e.target.onerror = null; e.target.src = "/blank_user.png"}}  Name="bd-placeholder-img rounded-circle border mb-3" src={e.image} alt="" />
                                <h4 className="fw-normal text-center text-light">{e.name}</h4>
                            </div>
                        )
                })}
                    <div className="d-flex flex-column justify-content-center">
                        <button className="btn btn-secondary rounded-circle mb-2" onClick={createProfile}><i className="bi bi-plus-lg"></i></button>
                        <button className="btn btn-secondary rounded-circle mt-2 mb-5" onClick={editProfile}><i className="bi bi-pencil-square"></i></button>
                    </div>
                </div> 
                : 
                <div class="mx-4 d-flex justify-content-center">
                    <img src="/icon.png" alt="" className="loading-animation"></img>
                </div>} </>
            }
            {profileCreator && 
                <>
                    <div className="d-flex justify-content-between py-5 px-5" style={{width:"25%",margin:"0 auto"}}>
                        <h2 className="text-light">Create Profile</h2>
                        <button className="btn btn-secondary rounded-circle mb-2" onClick={exit}><i className="bi bi-x-lg"></i></button>
                    </div>
                    <div class="border border-1 py-5" style={{width:"25%", margin:"0 auto"}}>
                        <div className="d-flex align-items-center justify-content-center">
                            <h5 className="text-light me-4">Your New Profile is:</h5>
                            <div className="d-flex flex-column justify-content-center">
                                <img src={image} alt="" style={{width:"4em"}} className="rounded-circle ms-3 mb-2" />
                                <p className="text-light text-center" style={{width:"6em"}}><b>{name==="" ? "Insert Name" : name}</b></p>
                            </div>
                        </div>
                        <div className="d-flex flex-column align-items-center justify-content-center">
                            <form action="" onSubmit={postProfile}>

                                <div className="mt-4 mb-5 d-flex align-items-center justify-content-between">
                                    <h4 className="text-light">Name:</h4>
                                    <input type="text" name="name" maxLength="20" className="new-name-input ps-1 py-1 bg-transparent border border-1 border-light rounded rounded-1 text-light" style={{width:"18em"}} value={name} onChange={(e)=>{setName(e.target.value)}}/>
                                </div>
                                <h5 className="text-light mb-2">Choose your default image:</h5>
                                <div className="d-flex flex-column">
                                    <div className="profile-selector d-flex justify-content-evenly my-3">
                                        <img src="/blank_user.png" alt="" className="mx-2" onClick={(e)=>{setImage(e.target.src)}}/>
                                        <img src="/orange_user.png" alt="" className="mx-2" onClick={(e)=>{setImage(e.target.src)}}/>
                                        <img src="/guitar_user.png" alt="" className="mx-2" onClick={(e)=>{setImage(e.target.src)}}/>
                                        <img src="/reel_user.png" alt="" className="mx-2" onClick={(e)=>{setImage(e.target.src)}}/>
                                    </div>
                                    {error ? <p className="text-center text-light mt-2" style={{fontSize:"0.9rem"}}><b>Error: You can't have an empty field as your new name</b></p> : <hr className="text-light border border-1" />}
                                    <button className="btn my-2 text-light colorButton">Create Profile</button>
                                </div>
                            </form>
                        </div>
                    </div>
                </>
            }

            {profileEditor && 
            <>
                <div className="d-flex justify-content-between py-5 px-5" style={{width:"75%",margin:"0 auto"}}>
                        <h2 className="text-light">Edit Profile</h2>
                        <button className="btn btn-secondary rounded-circle mb-2" onClick={exit}><i className="bi bi-x-lg"></i></button>
                </div>
                {
                    profiles.map((e)=>{
                        let profileLink = `/edit-profile/${e._id}`
                        return(
                            <div className='profile-selector position-relative reverseColorButton pt-3 d-flex align-items-center justify-content-center' key={e._id} style={{width:"30%", margin:"2em auto"}}>
                                <img onError={(e)=> {e.target.onerror = null; e.target.src = "/blank_user.png"}}  className="bd-placeholder-img rounded-circle border mb-3" src={e.image} alt="" />
                                <h2 className="ms-4 fw-normal text-center"><b>{e.name}</b></h2>
                                <Link to={profileLink} style={{textDecoration:"none"}}><button className="position-absolute btn btn-dark rounded-circle mb-2" style={{top:"0.7em", right:"1.3em"}}><i className="bi bi-pencil-square"></i></button></Link>
                            </div>
                        )
                })}
            </>}
        </>
    )
}

export default Profiles