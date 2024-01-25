import { useState, useContext } from 'react'
import axios from 'axios'
import { Navigate } from 'react-router-dom'

function CreateProfile(){
    const [name, setName] = useState('')
    const [image, setImage] = useState('')
    const [msj,setMensaje]= useState(false)
   const [retorno, setRetorno]= useState(true)
    const datosName = (e) => {
      setName(e.target.value);
    };
  
    const datosImage = (e) => {
      setImage(e.target.value);
    };
  
    const enviarDatos = (e) => {
      e.preventDefault();
  
      const userData = {name, image}
  
      
      axios.post('https://pelis-mern-server-five.vercel.app/createProfile', userData, { withCredentials: true })
        .then(response => {
            if (response.data.mensaje == "el usuario ya exite"){
                console.log("paso1")
                setMensaje(true)
                window.location.reload()
            }else if(response.data.mensaje == 'usuario creado con exito'){
                console.log(response.data.mensaje )
                setRetorno(false)
                setMensaje(false)
            }
        })
        .catch(error => {
            console.log(error)
        })
      };
      if(retorno == false){
        console.log("paso retunr")
        return <Navigate to="/profiles"/>;
      }
    return(
        <>
            <form onSubmit={enviarDatos}>
                <div className='d-flex flex-column'>
                    {msj?
                    <p>usuario existente!</p>:null
                    }
                    <label className='p-2 text-start'>name:</label>
                    <input className='p-2 form-control' type="text"  value={name} onChange={datosName} required />
                </div>
                <div className='d-flex flex-column pb-2'>
                    <label className='p-2 text-start' >Image:</label>
                    <input className='p-2 form-control' type="text" value={image} onChange={datosImage} required />      
                </div>
            <button className='btn colorButton ancho mt-2 p-2' type="submit">Continuar</button>
            </form>
        </>
    )
}

export default CreateProfile