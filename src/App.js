import React, {Component} from 'react';
import Particles from 'react-particles-js';
import './App.css';
import Navigation from './components/navigation/Navigation';
import Logo from './components/logo/Logo';
import ImageLinkForm from './components/ImageLinkForm/ImageLinkForm';
import FaceRecognition from './components/FaceRecognition/FaceRecognition.js';
import SignIn from './components/SignIn/SignIn.js';
import Register from './components/Register/Register.js';
import Rank from './components/rank/Rank';
import 'tachyons';


const particles = {
  particles:{      
    number:{
      value: 200,
      density:{
        enable:true,
        value_area: 800
      }
    }
  
  }
};



const initState = {
  input: '',
  urlInput: '',
  box: {},
  route: 'singIn',
  isSignedIn: false,
  user:{
    id: "",
    name: "",
    email: "",
    entries: 0,
    joined: ""
  }
}


class App extends Component {
  constructor(){
    super();
    this.state= initState;
  }

  onUserChanged = (data) =>{
    this.setState({user:{
      id: data.id,
      name: data.name,
      email: data.email,
      entries: data.entries,
      joined: data.joined
    }});
  }

  onRouteChange = (route) =>{
   
    if (route === 'signIn'|| route === 'register')
      this.setState(initState);
    else if (route === 'home'){
        this.setState({isSignedIn: true});
    }

    this.setState({route: route});
  }

  imageBox = (response) =>{
    const clarifaiBox = response.outputs[0].data.regions[0].region_info.bounding_box;
    const image = document.getElementById('imageInput');
    const width = Number(image.width); 
    const height = Number(image.height);

    return{
        left: clarifaiBox.left_col * width,
        right: width - (clarifaiBox.right_col * width),
        top: clarifaiBox.top_row * height,
        bottom: height - (clarifaiBox.bottom_row * height)
    }


  }

  processImage = (box) =>{
    this.setState({box:box})
    console.log(this.state.box);
  }


  onInputChange = (event) =>{
    this.setState({input: event.target.value});
  }
  onButtonSubmit = () =>{
    this.setState({urlInput: this.state.input});


    fetch("https://fast-ridge-45586.herokuapp.com/imageurl", {
            method: "PUT",
            headers: {'Content-Type': "application/json"},
            body: JSON.stringify({
                input: this.state.input
            })
    })
    .then(response => response.json())
    .then(response => {
        if(response){
          fetch("https://fast-ridge-45586.herokuapp.com/image", {
            method: "PUT",
            headers: {'Content-Type': "application/json"},
            body: JSON.stringify({
                id: this.state.user.id
            })
           
          })
          .then( data => data.json())
          .then(count => {
            this.setState(Object.assign(this.state.user, {entries: count}))
          })
          
        }

        this.processImage(this.imageBox(response));
    })
    .catch(err => console.log(err));

  }

  render(){
    
    return (
      <div className="App">
                      <Particles className="particles"
                  params={particles} />
          <Navigation isSignedIn={this.state.isSignedIn} onRouteChange={this.onRouteChange}/>
          {this.state.route === 'home' 
          ? <div>
              <Logo />
              <Rank name={this.state.user.name} 
                    entries={this.state.user.entries}
              />
              <ImageLinkForm 
                    onInputChange={this.onInputChange} 
                    onButtonSubmit= {this.onButtonSubmit}
              />
              <FaceRecognition box={this.state.box} urlInput={this.state.urlInput}/>
           </div>
          : this.state.route === 'register'
            ?  <Register onRouteChange={this.onRouteChange} onUserChanged={this.onUserChanged}/>
            :  <SignIn  onUserChanged={this.onUserChanged} onRouteChange={this.onRouteChange}/>
          } 

      </div>
    );
  }


}

export default App;
