import React from 'react';
import './ImageLinkForm.css'

const ImageLinkForm = ({onInputChange, onButtonSubmit}) =>{
    return(
        <div>
            <p className="f3">
                {`Hey! let's identiy the age and gender from the Image`}
            </p>
            <div className="center">
                <div className ="form center w-50 pa4 br3 shadow-5">
                    <input className="br3 f4 pa2 center w-70" type='text' onChange={onInputChange} placeholder="Enter Url of the image"/ >
                    <button className="br3 w-30 grow f4 link ph3 pv2 dib white bg-light-purple imgButton" onClick={onButtonSubmit}> Detect</button>
                </div>
            </div>
        </div>
    )
}
export default ImageLinkForm;