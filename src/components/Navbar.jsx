import React, { useEffect } from 'react'
import { Link, useLocation } from 'react-router-dom'
import { useNavigate } from 'react-router-dom';
import logimg from '../img/logo.jpeg'
const Navbar = () => {
  const navigate = useNavigate();
  let location = useLocation()
  // useEffect(() =>{
  //   console.log(['pageview', location.pathname])
  // }, [location])

  const HandleLogOut = ()=>{
    localStorage.removeItem('token')
    navigate('/Login')
  }

  return (

    <nav className="navbar navbar-expand-lg navbar-light bg-light">
      <div className="container-fluid">
        <Link className="navbar-brand" to="/">Note Book</Link>
        <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
          <span className="navbar-toggler-icon"></span>
        </button>
        <div className="collapse navbar-collapse" id="navbarSupportedContent">
          <ul className="navbar-nav me-auto mb-2 mb-lg-0 text">
            <li className="nav-item">
              <Link className={`nav-link fw-bold ${location.pathname === '/home' ? "active" : ""}`} aria-current="page" to="/">Home</Link>
            </li>
            <li className="nav-item">
              <Link className={`nav-link fw-bold  ${location.pathname === '/about' ? "active text-success" : ""}`} to='/about'>About</Link>
            </li>
            {/* <li className="nav-item dropdown">
          <a className="nav-link dropdown-toggle" href="#" id="navbarDropdown" role="button" data-bs-toggle="dropdown" aria-expanded="false">
            Dropdown
          </a>
          <ul className="dropdown-menu" aria-labelledby="navbarDropdown">
            <li><a className="dropdown-item" href="#">Action</a></li>
            <li><a className="dropdown-item" href="#">Another action</a></li>
            <li><hr className="dropdown-divider"/></li>
            <li><a className="dropdown-item" href="#">Something else here</a></li>
          </ul>
        </li> */}
            {/* <li className="nav-item">
          <a className="nav-link disabled" href="#" tabindex="-1" aria-disabled="true">Disabled</a>
        </li> */}
          </ul>
          {!localStorage.getItem('token') ? <form className="d-flex">
            <input className="form-control me-2" type="search" placeholder="Search" aria-label="Search" />
            <button className="btn btn-outline-success m-1" type="submit">Search</button>
            <Link to='/Login' className="btn btn-outline-success m-1" type="submit">Login</Link>
            <Link to='/Signup' className="btn btn-outline-success m-1" type="submit">Signup</Link>
          </form> :
             <div>
              <Link to='/Profile'>
              <img src={logimg} className= 'img' style={{"width":"3rem", "height":"3rem", "border-radius":"50%"}}  />
              </Link>
              <button onClick={HandleLogOut} className="btn btn-outline-success m-1" type="submit">Logout</button>
             </div>
            
          }
        </div>
      </div>
    </nav>

  )
}

export default Navbar