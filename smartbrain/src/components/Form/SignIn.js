import React from 'react';

const SignIn = ({onRouteChange})=>{
    return(
        <article className="bw1 br2 ba  b--black-10 mv6 w-90 w-60-m w-25-l mw6 center br2 shadow-5">
            <main className=" pa4 black-80 ">
                <div className="measure center">
                    <fieldset id="sign_up" className="ba b--transparent ph0 mh0">
                        <legend className="f2 fw6 ph0 mh0">Sign In</legend>
                        <div className="mt3">
                            <label className="db fw6 lh-copy f4" htmlFor="email-address">Email</label>
                            <input className="bw1 br2 b--black pa2 input-reset ba bg-transparent hover-bg-black hover-white w-100" type="email" name="email-address"  id="email-address" />
                        </div>
                        <div className="mv3">
                            <label className="db fw6 lh-copy f4" htmlFor="password">Password</label>
                            <input className="bw1 b--black br2 b pa2 input-reset ba bg-transparent hover-bg-black hover-white w-100" type="password" name="password"  id="password" />
                        </div>
                        
                    </fieldset>
                    <div className="">
                        <input 
                        onClick = {() => onRouteChange('home')}
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