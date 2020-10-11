import React from 'react';
import Tilt from 'react-tilt'
import './Logo.css';
import Brain from '../logo/brain.png';


const Logo = () => {
    return (
            <Tilt className="Tilt" options={{ max : 50 }} style={{ height: 100, width: 100 }} >
                 <div className="Tilt-inner"> 
                    <img src={Brain} alt="brain" className="pa3"/> 
                 </div>
            </Tilt>
    );


};


export default Logo;