import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom';

const Signup = (props) => {

    const [Credential, setCredential] = useState({name: '', email:'', password: ''}) 
    const navigate = useNavigate();
    
    const HandleSubmit = async(e)=>{
        e.preventDefault()
       try {
        
        const { name, email, password} =  Credential
        const response = await fetch('http://localhost:3060/api/auth/createUser', {
             method: 'POST',
             headers: {
                 'Content-Type': 'application/json'                
             },
             body: JSON.stringify({name, email, password})
         })
         const json = await response.json();
        console.log(json);
        if(json.success){

            localStorage.setItem('token', json.authtoken)
            navigate('/')
            props.showAlert('succesfulyy created your account', 'success') 

        }else{
            props.showAlert('invalid email and email already exist', 'danger') 
        }

       } catch (error) {
        console.log(error);
       }
    }

    const onChange = (e)=>{
        setCredential({...Credential, [e.target.name]: e.target.value})
    }
  return (
    <div className='container'>
          <form onSubmit={HandleSubmit}>
          <div className=" mb-3">
                <label htmlFor="name" className="form-label">User_Name</label>
                <input type="name" className="form-control" id="name" aria-describedby="emailHelp" name='name' onChange={onChange}/>
            </div>
            <div className=" mb-3">
                <label htmlFor="email" className="form-label">Email address</label>
                <input type="email" className="form-control" id="email" aria-describedby="emailHelp" name='email' onChange={onChange}/>
                <div id="emailHelp" className="form-text">We'll never share your email with anyone else.</div>
            </div>
            <div className="mb-3">
                <label htmlFor="password" className="form-label">Password</label>
                <input type="password" className="form-control" id="password" name='password' minLength="5" required  onChange={onChange} />
            </div>
            <button type="submit" className="btn btn-primary" >Submit</button>
        </form>
    </div>
  )
}

export default Signup