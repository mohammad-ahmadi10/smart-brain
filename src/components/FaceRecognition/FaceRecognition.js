import React from 'react';
import './FaceRecognition.css'


const FaceRecognition = ({urlInput, box}) => {
    return (
        <div className="middle">
            <div className='absolute'>
                <img id='imageInput' alt='' src={urlInput} width='500px' height='auto'/>
                <div className='bound_box' style={{top:box.top, left:box.left, right:box.right, bottom:box.bottom}}>
                </div>
            </div>
        </div>
    );


};


export default FaceRecognition;