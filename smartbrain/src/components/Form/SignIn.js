import React, {useState} from 'react';

const SignIn = ({loadUser,onRouteChange})=>{

    const [signInEmail, setSignInEmail] = useState('');
    const [signInPassword, setSignInPassword] = useState('');

    function onEmailChange(event){
        // console.log(event.target.value)
        setSignInEmail(event.target.value);
    }

    function onPasswordChange(event){
        // console.log(event.target.value)
        setSignInPassword(event.target.value)
    }

    function onSubmitButton(){
        
        fetch('http://localhost:3001/signin',{
            method: 'post',
            headers: {"Content-Type" : 'application/json'},
            body: JSON.stringify({
                "name" : signInEmail,
                "password" : signInPassword
            })
        })
        .then(response => response.json() )
        .then (data => {
            if (data.id){
                loadUser(data);
                onRouteChange('home');
            }
        })
    }


    return(
        <article className="bw1 br2 ba  b--black-10 mv6 w-90 w-60-m w-25-l mw6 center br2 shadow-5">
            <main className=" pa4 black-80 ">
                <div className="measure center">
                    <fieldset id="sign_up" className="ba b--transparent ph0 mh0">
                        <legend className="f2 fw6 ph0 mh0">Sign In</legend>
                        <div className="mt3">
                            <label className="db fw6 lh-copy f4" htmlFor="email-address">Email</label>
                            <input
                                onChange = {onEmailChange} 
                                className="bw1 br2 b--black pa2 input-reset ba bg-transparent hover-bg-black hover-white w-100" 
                                type="email" 
                                name="email-address"  
                                id="email-address" 
                            />
                        </div>
                        <div className="mv3">
                            <label className="db fw6 lh-copy f4" htmlFor="password">Password</label>
                            <input
                                onChange = {onPasswordChange} 
                                className="bw1 b--black br2 b pa2 input-reset ba bg-transparent hover-bg-black hover-white w-100" 
                                type="password" 
                                name="password"  
                                id="password" 
                            />
                        </div>
                        
                    </fieldset>
                    <div className="">
                        <input 
                        onClick = {onSubmitButton}
                        className="br2 shadow-2 b ph3 pv2 input-reset ba b--black bg-transparent grow pointer f5 dib" type="submit" value="Sign in" />
                        </div>
                        <div className="lh-copy mt3">
                        <a onClick = {()=> onRouteChange('register')} href="#0" className="f5 fw6  link dim black db">Sign up</a>
                    </div>
                </div>
            </main>
        </article>
    )
}

export default SignIn