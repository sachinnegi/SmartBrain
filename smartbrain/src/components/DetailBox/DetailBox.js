import React from 'react';
import Tilt from 'react-tilt'
import './DetailBox.css'

const DetailBox = ({details}) =>{
    
    var {age,ageProb,gender,genProb} = details;
    if (gender) gender = (gender==="masculine") ? 'Male': 'Female'; 
    ageProb = parseFloat(ageProb).toFixed(2);
    genProb = parseFloat(genProb).toFixed(2)

    return (
        <div className="pt2">

            <Tilt className="Tilt center br4 shadow-4 ba bw2 b--blue" options={{ max : 30 }} style={{ height: 100, width: 365 }} >
                <div className="Tilt-inner tilt"> 
                    <p>Age: {age} , Prob: {ageProb}</p>
                    <p>Gender: {gender} , Prob: {genProb}</p>
                </div>
            </Tilt>
            
            
        </div>
    )
}

export default DetailBox;