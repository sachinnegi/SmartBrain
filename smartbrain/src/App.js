import React, {Component} from 'react';
import './App.css';
import 'tachyons';
import Clarifai from 'clarifai';
import Particles from 'react-particles-js';
import Navigation from './components/navigation/Navigation';
import Logo from './components/Logo/Logo';
import ImageLinkForm from './components/ImageLinkForm/ImageLinkForm';
import Rank from './components/Rank/Rank';
import FaceRecognition from './components/FaceRecognition/FaceRecognition';
import DetailBox from './components/DetailBox/DetailBox';
import SignIn from './components/Form/SignIn';
import Register from './components/Form/Register';


const app = new Clarifai.App({
    apiKey: 'b62ed9f34c3643379f6bd97d1452bf64'
   });

const particleoptions={
        "particles": {
            "number": {
                "value": 50,
                "density": {
                    "enable": false
                }
            },
            "size": {
                "value": 15,
                "random": true,
                "anim": {
                    "speed": 4,
                    "size_min": 0.3
                }
            },
            "line_linked": {
                "enable": false
            },
            "move": {
                "random": true,
                "speed": 1,
                "direction": "top",
                "out_mode": "out"
            }
        },
        "interactivity": {
            "events": {
                "onhover": {
                    "enable": true,
                    "mode": "bubble"
                },
                "onclick": {
                    "enable": true,
                    "mode": "repulse"
                }
            },
            "modes": {
                "bubble": {
                    "distance": 250,
                    "duration": 2,
                    "size": 0,
                    "opacity": 0
                },
                "repulse": {
                    "distance": 400,
                    "duration": 4
                }
            }
        }
}

class App extends Component{

    constructor(){
        super();
        this.state = {
            input : '',
            imgUrl : '',
            imgConcepts : 'default',
            route : 'signin',
            isSigned: false,
        }
    }

    

    onInputChange = (event)=>{
        this.setState({input:event.target.value});
    }

    setImageConcept(value){
        this.setState({imgConcepts:value});
    }
    
    onRouteChange = (route) => {
        if (route === 'signin' ){
            this.setState({isSigned : false});
        }
        else if (route === 'home'){
            this.setState({isSigned : true});
        }
        this.setState({route: route});
    }

    getData = (response) =>{
            let age=0, ageProb = -1;
            let gender = null, genProb = -1;
            var classification = response.outputs[0].data.regions[0].data.concepts;
            classification.forEach(element => {
                if (element.vocab_id === "age_appearance" && element.value>ageProb){
                    age = element.name;
                    ageProb = element.value;
                }
                else if (element.vocab_id === "gender_appearance" && element.value>genProb){
                    gender = element.name;
                    genProb = element.value;
                }
            });
            
            return {'age':age,
                    "ageProb":ageProb,
                    "gender":gender,
                    "genProb":genProb
                }
    }

    onButtonSubmit = (event)=>{
        this.setState({imgUrl:this.state.input})
       
        app.models.predict("c0c0ac362b03416da06ab3fa36fb58e3", this.state.input).then(
            (response) => ( this.setImageConcept(this.getData(response))),
            (err) => (console.log(err))
            
        );

    }

  render(){
    return(
      <div className='App'>
        
        {/*  <Particles className = "particle" params={particleoptions} />  */}
        
        <Navigation isSigned={this.state.isSigned} onRouteChange={this.onRouteChange }/>
        
        { this.state.route === 'signin'
            ? <SignIn onRouteChange={this.onRouteChange}/>
            : this.state.route === 'register'
                ? <Register onRouteChange={this.onRouteChange}/>
                : <div>
                    <Logo/>
                    <Rank/>
                    <ImageLinkForm onInputChange={this.onInputChange} onButtonSubmit={this.onButtonSubmit} />
                    <DetailBox details={this.state.imgConcepts}/>
                    <FaceRecognition url={this.state.imgUrl}/>
                 </div>
        } 
      </div>
    )
  }
}
export default App