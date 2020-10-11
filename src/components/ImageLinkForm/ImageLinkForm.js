import React from 'react';

import '../ImageLinkForm/ImageLinkForm.css'

const ImageLinkForm = ({onInputChange, onButtonSubmit}) => {
    return (
        <div>
            <p className="f4">
                {'this magic brain will detect faces in your Picture. give it a try!'}
            </p>

            <div className="center ">
                <div className="center pa4 br3 shadow-5 w-40">
                    <input type="text" className="f4 pa w-70 center" onChange={onInputChange}/>
                    <button className="w-30 grow pa f4 link ph3  dib white bg-light-purple pointer"
                    onClick={onButtonSubmit}>detect</button>
                </div>
            </div>

        </div>

    );


};


export default ImageLinkForm;