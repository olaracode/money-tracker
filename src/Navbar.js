import React from 'react'
import './navbar.css'
import navlogo from './images/Navlogo.png'
import {Link} from 'react-router-dom'

function Navbar() {
    return (
        <nav className="nav">
            <div className="navContainer">    
                {/* <Link>
                    <h3 className="izquierda">Ingresa</h3>
                </Link> */}
                <Link to="/" className="logoContainer">
                    Money Comet
                </Link>
                {/* <Link>
                    <h3 className="derecha">Sobre nosotros</h3>
                </Link> */}
            </div>
        </nav>
    )  
}

export default Navbar
