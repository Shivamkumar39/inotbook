import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom';


const Login = (props) => {

    const [Credential, setCredential] = useState({email:'', password: ''})
   // const [ note, setNote] = useState()
    const navigate = useNavigate();
    const HandleSubmit = async(e) =>{
        e.preventDefault()
        try {
            const response = await fetch('http://localhost:3060/api/auth/login', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'                
                },
                body: JSON.stringify({ email: Credential.email, password: Credential.password })
            });
    
            const json = await response.json();
            console.log(json);
    
            if (json.success) {
                localStorage.setItem('token', json.authtoken);
                navigate('/');
                props.showAlert('Login successfully', 'success');
            } else {
                props.showAlert('Invalid credentials', 'danger');
            }
        } catch (error) {
            console.error('Login error:', error);
            props.showAlert('Login failed. Please try again later.', 'danger');
        }
    }

    const onChange = (e)=>{
        setCredential({...Credential, [e.target.name]: e.target.value})
        //setNote({...note, [e.target.name]: e.target.value})
    }
    return (
        <form onSubmit={HandleSubmit} className='container'>
            <div className=" mb-3">
                <label htmlFor="email" className="form-label">Email address</label>
                <input type="email" className="form-control" id="email" aria-describedby="emailHelp" name='email' value={Credential.email} onChange={onChange}/>
                <div id="emailHelp" className="form-text">We'll never share your email with anyone else.</div>
            </div>
            <div className="mb-3">
                <label htmlFor="password" className="form-label">Password</label>
                <input type="password" className="form-control" id="password" name='password'value={Credential.password} onChange={onChange} />
            </div>
            <button type="submit" className="btn btn-primary">Submit</button>
        </form>
    )
}

export default Login