import React from 'react';

const FaceRecognition = ({url}) =>{
    return (
        <div className ="Center ma">
            <div className=" mt2 center">
                <img alt="" src = {url} width='500px' height= 'auto' />
            </div>
        </div>
    )
}

export default FaceRecognition;