import React from 'react';

class Register extends React.Component{
     
    constructor(){
        super ();
        this.state ={
            email: "",
            password:"",
            name:""
        }
    }

    onEmailChanged = (event)=>{
        let {value} = event.target;
        this.setState({email: value});
    }
    onPasswordChanged = (event) =>{
        let {value} = event.target; 
        this.setState({password: value});
    }
    onNameChanged = (event) =>{
        let {value} = event.target;
        this.setState({name: value});
    }


    /*
        Password checking: 
        " start of string 1 digit (at least). 
        at least 1 letter. 
        6 or more non-whitespace chars. 
        end of string anchor "
    */
    checkPassWord = (password) =>{
        const regex = /^(?=.*\d)(?=.*[a-zA-Z])\S{6,}$/;
        return (regex.exec(password)) !== null;
    }

    checkImail = (email) =>{
    let regex = /^\w+([.-]?\w+)*@\w+([.-]?\w+)*(.\w{2,3})+$/;
    return (regex.exec(email) !== null)
    }

    checkName = (name) =>{
        let regex = /^[a-zA-Z]+(([',. - _ @ : $ & ]*[a-zA-Z ])?[a-zA-Z]\S*)*$/;
        return (regex.exec(name) !== null)
    }

    onSumit = ()=>{
        const {email, name, password} = this.state;
        
        let isPassValid = this.checkPassWord(password);
        let isEmailValid = this.checkImail(email);
        let isNameValid = this.checkName(name);

        if (isEmailValid && isPassValid && isNameValid) {
                // The result can be accessed through the `m`-variable.
                fetch("https://fast-ridge-45586.herokuapp.com/register", {
                    method:"POST",
                    headers:{'Content-Type': "application/json"},
                    body: JSON.stringify({
                        email: email,
                        password: password,
                        name: name
                    })
                })
                .then(response => response.json())
                .then(user => {
                    if(user.id){
                        this.props.onRouteChange('home');
                        
                        this.props.onUserChanged(user);
                    }else{
                        console.log("there's a problem whit your data");
                    }
        
                });        
        } else console.log("passoword or Email or Name is invalid");


       
    }




    render(){
        return (
            <article class="center mw6 ba b--black-10 mv4 shadow-5 br3">
                <main className="pa4 black-80">
                    <div className="measure center">
                        <fieldset id="sign_up" className="ba b--transparent ph0 mh0">
                            <legend className="f3 i fw6 ph0 mh0 ">Register</legend>
                            <div className="mt3">
                                <label className="db i fw6 lh-copy f6" htmlFor="name">name</label>
                                <input 
                                className="pa2 input-reset ba bg-transparent hover-bg-black hover-white w-100" 
                                type="text" 
                                name="name"  
                                id="name"
                                onChange={this.onNameChanged}    
                            />
                            </div>
    
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
                        value="Register"/>
                        </div>
                    </div>
                </main>
            </article>
    
        );
    }



};


export default Register;