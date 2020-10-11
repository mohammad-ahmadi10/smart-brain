import React from 'react';


const Navigation = ({onRouteChange, isSignedIn}) => {

    if(isSignedIn){
            return(
                <nav style={{display: 'flex' , justifyContent: 'flex-end'}}>
                <p onClick={() => onRouteChange('signIn')} className="f3 link dim black underline pointer pa ma2">Sign out</p>
                </nav>
            )

    }else{
            return(
                <nav style={{display: 'flex' , justifyContent: 'flex-end'}}>
                <p onClick={() => onRouteChange('signIn')} className="f3 link dim black underline pointer pa ma2">Sign In</p>
                <p onClick={() => onRouteChange('register')} className="f3 link dim black underline pointer pa ma2">Register</p>
                </nav>
            )
    }
};


export default Navigation;