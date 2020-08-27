import React from 'react';
import './Navigation.css'

const Navigation = ({isSigned, onRouteChange })=>{
    if (isSigned === true){
        return(
                <nav className = "navigation " style={{display:'flex', justifyContent:'flex-end'}}>
                    <p onClick = {() => onRouteChange('signin')} className='ba b--black-20 mr2 shadow-5 bw2 h2 pb2 br2 f3 fw6 link dim black pointer'>Sign Out</p>
                </nav>
        );
    }
    else{
        return(
            <nav className = "navigation " style={{display:'flex', justifyContent:'flex-end'}}>
                <p onClick = {() => onRouteChange('signin')} className='ba b--black-20 mr2 shadow-5 bw2 h2 pb2 br2 f3 fw6 link dim black pointer'>Sign In</p>
                <p onClick = {() => onRouteChange('register')} className='ba b--black-20 mr2 shadow-5 bw2 h2 pb2 br2 f3 fw6 link dim black pointer'>Register</p>
            </nav>
        );

    }
}
export default Navigation