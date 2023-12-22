import { useState } from 'react'
import axios from 'axios'
import {NavLink, Navigate, Outlet, redirect} from "react-router-dom"



const SignUp = () => {
  
  const [name,setName] = useState('')
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  let [llav,setLlav]= useState(false)

  const datosName = (e) =>{
    setName(e.target.value)
  }

  const datosEmail = (e) => {
    setEmail(e.target.value)
  };

  const datosPassword = (e) => {
    setPassword(e.target.value)
  };

  const enviarDatos = (e) => {
    e.preventDefault()
    
    console.log('Name',name)
    console.log('Email:', email);
    console.log('Password:', password);
   
    const userData = { name, email, password }

    
    axios.post('http://localhost:3001/signup', userData , { withCredentials: true })
      .then(response => { 
        if(response.data.message == 'Usuario creado exitosamente'){
          setLlav("exitoso") }
      })
      .catch(error => {
        if(error.response.data.message == 'El usuario ya existe'){
          setLlav(true) }
      })
  }
  
  if(llav == "exitoso"){
    return <Navigate to="/signin"/>;
  }

  return (
    <div className='d-flex flex-column align-items-center text-center justify-content-center w-100 textWhite'>
        <div className='text-center p-2'>
            <img src="logo.png" alt="Movies Hub" class="logo"/>
        </div>
        <div className='d-flex flex-column ancho justify-content-start'>
            <h2 className='text-start'>Registro</h2>
            {llav?<p>el usuario ya existe</p>:null}
            <form onSubmit={enviarDatos}>
                <div className='d-flex flex-column'>
                    <label className='p-2 text-start' htmlFor="email">Nombre de usuario:</label>
                    <input className='p-2 form-control' type="text" id="name"  value={name} onChange={datosName} required />
                </div>
                <div className='d-flex flex-column'>
                    <label className='p-2 text-start' htmlFor="email">Correo Electrónico:</label>
                    <input className='p-2 form-control' type="email" id="email"  value={email} onChange={datosEmail} required />
                </div>
                <div className='d-flex flex-column pb-2'>
                    <label className='p-2 text-start' htmlFor="password">Contraseña:</label>
                    <input className='p-2 form-control' type="password" id="password" value={password} onChange={datosPassword} required />      
                </div>
            <button className='btn colorButton ancho mt-2 p-2' type="submit">Continuar</button>
            </form>
            <p class="align-self-start mt-2">Al continuar, aceptas las <a href="">Condiciones de uso</a> y el <a href="">Aviso de privacidad</a> de Movies Hub</p>
            <div class="d-flex">
              <a href='http://localhost:3001/auth/google' className='pe-2'><button className='btn colorButton p-2 btnRegistro'><i class="bi bi-google pe-1"></i>Registrese con Google</button></a>
                <button className='btn colorButton p-2 btnRegistro'><i class="bi bi-instagram pe-1"></i>Registrese con Instagram</button>
            </div>
        </div>
      
    </div>
  );
};

export default SignUp
