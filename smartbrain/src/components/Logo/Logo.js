import React from 'react';
import Tilt from 'react-tilt'
import './Logo.css'
import brain from "./brain.png"

const Logo = ()=>{
    return(
        <div className = 'ma4 mt0 w-30 container'>
            <Tilt className="Tilt br2 shadow-2" options={{ max : 60 }} style={{ height: 130, width: 130 }} >
                <div className="Tilt-inner"> 
                    <img alt ='logo' style={{paddingTop:'20px'}} src={brain}/> 
                </div>
            </Tilt>
        </div>

    );
}
export default Logo