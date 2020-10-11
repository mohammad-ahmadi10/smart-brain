import React from 'react';

class SignIn extends React.Component{
    
    constructor(){
        super ();
        this.state ={
            signinEmail: "",
            signinPassword:"",
        }
    }

    onEmailChanged = (event)=>{
        this.setState({signinEmail: event.target.value});
    }
    onPasswordChanged = (event) =>{
        this.setState({signinPassword: event.target.value});
    }

    onSumit = ()=>{
        fetch("https://fast-ridge-45586.herokuapp.com/signin", {
            method:"POST",
            headers:{'Content-Type': "application/json"},
            body: JSON.stringify({
                email: this.state.signinEmail,
                password: this.state.signinPassword
            })
        })
        .then(response => response.json())
        .then(data => {
            if(data.id){
                this.props.onRouteChange('home');
                this.props.onUserChanged(data);
            }else{
                console.log("incorect email or password");
            }
        });
        
        
       
    }

    render(){
        const {onRouteChange} = this.props;
        
        return (
            <article className="center mw6 ba b--black-10 mv4 shadow-5 br3">
                <main className="pa4 black-80">
                    <div className="measure center">
                        <fieldset id="sign_up" className="ba b--transparent ph0 mh0">
                            <legend className="f3 i fw6 ph0 mh0 ">Sign In</legend>
                            <div className="mt3">
                                <label className="db i fw6 lh-copy f6" htmlFor="email-address">Email</label>
                                <input 
                                className="pa2 input-reset ba bg-transparent hover-bg-black hover-white w-100" 
                                type="email" 
                                name="email-address"  
                                id="email-address"
                                onChange={this.onEmailChanged}
                                />
                            </div>
                            <div className="mv3">
                                <label className="db fw6 i lh-copy f6" htmlFor="password">Password</label>
                                <input 
                                className="b pa2 input-reset ba bg-transparent hover-bg-black hover-white w-100" 
                                type="password" 
                                name="password"  
                                id="password"
                                onChange={this.onPasswordChanged}
                                />

                            </div>
                        </fieldset>
                        <div className="">
                        <input 
                        onClick={this.onSumit}
                        className="b ph3 pv2 input-reset ba b--black bg-transparent grow pointer f6 dib" 
                        type="submit" 
                        value="Sign in"/>
                        </div>
                        <div className="lh-copy mt3">
                            <p onClick={() => onRouteChange('register')} className="f6 link dim black db pointer">Register</p>
                        </div>
                    </div>
                </main>
            </article>
    
        );
    }



};


export default SignIn;