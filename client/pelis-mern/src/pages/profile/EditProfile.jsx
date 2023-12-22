import axios from "axios"
import { useState, useEffect, useContext } from "react"
import { useParams, Link, useNavigate } from "react-router-dom"
import { UserContext } from "../../UserContext"
import Header from "../../components/Header"

function EditProfile(){
    const {user, setUser} = useContext(UserContext)
    const {id} = useParams()
    const index = user.profiles.findIndex(prof => prof._id == id)
    const navigate = useNavigate()
    const [subject,setSubject] = useState([])
    const [subjectName, setSubjectName] = useState("")
    const [subjectImage, setSubjectImage] = useState("")
    const [error, setError] = useState(null)

    useEffect(()=>{
        setSubject(user)
        setSubjectName(user.profiles[index].name)
        setSubjectImage(user.profiles[index].image)
    },[user, index])

    const sendChanges = async (e) => {
        e.preventDefault()
        if(subjectName === "" || subjectName === user.profiles[index].name){
            setError(true)
        }else{
            await axios.post("http://localhost:3001/update-profile",{
                id:user._id,
                index:index,
                name:subjectName,
                image:subjectImage
            }, {withCredentials: true})
            navigate("/")
        }
    }

    const update = async()=>{
        await axios.post("http://localhost:3001/get-user",{
                id:user._id
        },{withCredentials:true})
        .then(response => setUser(response.data))
        .catch(error => console.log(error))
    }

    const deleteProfile = async(e) => {
        e.preventDefault()
        await axios.delete("http://localhost:3001/delete-profile",{
            id:user._id,
            profileId:id
        },{withCredentials:true})
        .then(response => console.log(response))
        .catch(error => console.log(error))
    }
    return(
        <>
            <Header/>
            {subject != [] ? 
            <>
                <div className="d-flex justify-content-between py-5 px-5" style={{width:"25%",margin:"0 auto"}}>
                    <h2 className="text-light">Edit Profile</h2>
                    <Link to="/profiles" style={{textDecoration:"none"}}><button className="btn btn-secondary rounded-circle mb-2"><i className="bi bi-x-lg"></i></button></Link>
                </div>
                <div class="border border-1 py-5" style={{width:"25%", margin:"0 auto"}}>
                        <div className="d-flex align-items-center justify-content-center">
                            <h5 className="text-light me-4">Profile Preview:</h5>
                            <div className="d-flex flex-column justify-content-center">
                                <img src={subjectImage === user.profiles[index].image ? user.profiles[index].image : subjectImage} alt="" style={{width:"4em"}} className="rounded-circle ms-3 mb-2" />
                                <p className="text-light text-center" style={{width:"6em"}}><b>{subjectName === "" ? user.profiles[index].name : subjectName}</b></p>
                            </div>
                        </div>
                        <div className="d-flex flex-column align-items-center justify-content-center">
                            <form action="">
                                <div className="mt-4 mb-5 d-flex align-items-center justify-content-between">
                                    <h4 className="text-light mt-1">Name:</h4>
                                    <input type="text" name="name" maxLength="20" className="new-name-input ps-1 py-1 bg-transparent border border-1 border-light rounded rounded-1 text-light" 
                                    style={{width:"18em"}} placeholder={user.profiles[index].name} value={subjectName} onChange={(e)=>{setSubjectName(e.target.value)}} />
                                </div>
                                <h5 className="text-light mb-2">Choose your default image:</h5>
                                <div className="d-flex flex-column">
                                    <div className="profile-selector d-flex justify-content-evenly my-3">
                                        <img src="/blank_user.png" alt="" className="mx-2" onClick={(e)=>{setSubjectImage(e.target.src)}}/>
                                        <img src="/orange_user.png" alt="" className="mx-2" onClick={(e)=>{setSubjectImage(e.target.src)}}/>
                                        <img src="/guitar_user.png" alt="" className="mx-2" onClick={(e)=>{setSubjectImage(e.target.src)}}/>
                                        <img src="/reel_user.png" alt="" className="mx-2" onClick={(e)=>{setSubjectImage(e.target.src)}}/>
                                    </div>
                                    {error ? <p className="text-center text-light mt-2" style={{fontSize:"0.9rem"}}><b>Error: You can't have an empty field as your new name</b></p> : <hr className="text-light border border-1" />}
                                    <button className="btn my-2 text-light colorButton" onClick={(e)=>{sendChanges(e).then(setTimeout( async()=>{ await update(); }, 1000 ))}}>Save Profile</button>
                                    <button className="btn my-2 text-light reverseColorButton" onClick={(e)=>{deleteProfile(e).then(setTimeout( ()=>{ if(error==null){ navigate("/") } }, 1000 ))}}>Delete Profile</button>
                                </div>
                            </form>
                        </div>
                    </div>
            </> : 
            <div className="mx-4 d-flex justify-content-center">
                    <img src="/icon.png" alt="" className="loading-animation"></img>
            </div>}
        </>
    )
}

export default EditProfile