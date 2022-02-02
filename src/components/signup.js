import React from "react";
import { Link } from 'react-router-dom';
import { useState } from "react";
import { getAuth, createUserWithEmailAndPassword } from 'firebase/auth';
import { useNavigate } from "react-router-dom";



export default function SignUp({ title }) {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [mssg, setMssg] = useState('');
    const navigate = useNavigate();

    const handlesubmit = (e) => {
        e.preventDefault();

        const authentication = getAuth();
        setMssg("")
        createUserWithEmailAndPassword(authentication, email, password)
            .then((response) => {
                sessionStorage.setItem('Auth Token', response._tokenResponse.refreshToken);
                navigate('/');
            }).catch((error) => {
                setMssg("User already exists...");
            });
    }

    return (
        <div className="logincon">
            <div className="logincover"></div>
            <div className="loginwrapper">
                <p className="loginhead">Meme Generator</p>
                <p className="logintext">Signup</p>
                <hr></hr>
                <form className="inputform" onSubmit={e => handlesubmit(e)}>
                    <p className="loginlabel">Email</p>
                    <input type="email" placeholder="abc@xyz.com" value={email} onChange={(event) => setEmail(event.target.value)} required />
                    <p className="loginlabel">Password</p>
                    <input type="password" placeholder="" value={password} onChange={(event) => setPassword(event.target.value)} required />
                    {
                        mssg ? <p className="errmssg">{mssg}</p> : <></>
                    }
                    <button type="submit" className="logformbut">Submit</button>
                </form>
                <Link to="/login">
                    <button className="logformbut but2">Already have an account?</button>
                </Link>
            </div>

        </div>
    );
}