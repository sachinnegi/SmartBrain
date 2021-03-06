import React, {useState} from 'react';

const Form = ({loadUser, onRouteChange})=>{

    const [registerName, setName]  = useState('');
    const [registerEmail, setEmail ] = useState('');
    const [registerPassword, setPassword] = useState('');

    function getName(event){
        setName(event.target.value);
    }

    function getEmail(event){
        setEmail(event.target.value);
    }

    function getPassword(event){
        setPassword(event.target.value);
    }

    function onSubmitButton(){
        
        fetch('http://localhost:3001/register',{
            method : 'post',
            headers: {"Content-Type" : "application/json"},
            body : JSON.stringify({
                "name" : registerName,
                "email" : registerEmail,
                "password" : registerPassword
            })
        })
         .then(response => {
             if (response.status!==400){
                console.log(response.status)
                return response.json();
             }
            })
            .then(user =>{
                if (user){
                    console.log(user);
                    onRouteChange('home');
                    loadUser(user);
                }
            })
    }

    return(
        <article className="bw1 br2 ba  b--black-10 mv6 w-90 w-60-m w-25-l mw6 center br2 shadow-5">
            <main className=" pa4 black-80 ">
                <div className="measure center">
                    <fieldset id="sign_up" className="ba b--transparent ph0 mh0">
                        <legend className="f2 fw6 ph0 mh0">Sign Up</legend>
                        <div className="mt3">
                            <label className="db fw6 lh-copy f4" htmlFor="email-address">Email</label>
                            <input 
                                onChange = {getEmail}
                                className="bw1 br2 b--black pa2 input-reset ba bg-transparent hover-bg-black hover-white w-100" 
                                type="email" 
                                name="email-address"  
                                id="email-address" />
                        </div>
                        <div className="mt3">
                            <label className="db fw6 lh-copy f4" htmlFor="name">Name</label>
                            <input 
                                onChange = {getName}
                                className="bw1 br2 b--black pa2 input-reset ba bg-transparent hover-bg-black hover-white w-100" 
                                type="name" 
                                name="name"  
                                id="name" />
                        </div>
                        <div className="mv3">
                            <label className="db fw6 lh-copy f4" htmlFor="password">Password</label>
                            <input 
                                onChange = {getPassword}
                                className="bw1 b--black br2 b pa2 input-reset ba bg-transparent hover-bg-black hover-white w-100" 
                                type="password" 
                                name="password"  
                                id="password" />
                        </div>
                        
                    </fieldset>
                        <div className="">
                            <input 
                            onClick = {onSubmitButton}
                            className="br2 shadow-2 b ph3 pv2 input-reset ba b--black bg-transparent grow pointer f6 dib" type="submit" value="Register" />
                        </div>
                        
                </div>
            </main>
        </article>
    )
}

export default Form