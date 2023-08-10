import React, { useState } from 'react';
import TwitterHomeimg from '../../assets/images/twitter-splash.jpg';
import TwitterIcon from '@mui/icons-material/Twitter';
import auth from '../../firebase.init';
import { useSignInWithEmailAndPassword, useSignInWithGoogle } from 'react-firebase-hooks/auth';
import "./Login.css";
import { useNavigate, Link } from 'react-router-dom';
import GoogleButton from 'react-google-button';

export default function Login() {

    const [email, setEmail] = useState('');
    const [password, setPassword] = useState();
    // const [error, setError] = useState(" ");

    const [
        signInWithEmailAndPassword,
        user,
        loading,
        error,
    ] = useSignInWithEmailAndPassword(auth);

    const [signInWithGoogle, GoogleUser, GoogleLoading, GoogleError] = useSignInWithGoogle(auth);

    const navigate = useNavigate();





    const handleGoogleSignIn = () => {
        signInWithGoogle();
    }


    const handleSubmit = (e) => {
        e.preventDefault();
        signInWithEmailAndPassword(email, password);
    }
    if (user || GoogleUser) {
        console.log((user));
        console.log(GoogleUser);
        navigate('/')
    }
    if (error) {
        console.log(error);
    }
    if (loading) {
        console.log(loading);
    }

    return (
        <div className='login-container'>
            <div className="image-container">
                <img className='Twitter-img' src={TwitterHomeimg} alt="TwitterLogin_img" />
            </div>
            <div className="form-container">
                <div className='form-box'>
                    <TwitterIcon style={{ color: 'skyblue' }} />
                    <h2>Happening now</h2>
                    <form onSubmit={handleSubmit} >
                        <input type="email" className='email' placeholder='Enter your email' onChange={(e) => setEmail(e.target.value)} />


                        <input type="password" className='password' placeholder='Password' onChange={(e) => setPassword(e.target.value)} />
                        <div className="btn-login">
                            <button type='submit' className='btn'>Login</button>
                        </div>
                    </form>
                </div>
                <hr />
                <div className='google-button'>
                    <GoogleButton
                        className='g-btn'
                        type='light'
                        onClick={handleGoogleSignIn}
                    />
                </div>
                <div>
                    Don't have an account?
                    <Link to={'/signup'}
                        style={{
                            textDecoration: 'none',
                            color: 'skyblue',
                            fontWeight: '600',
                            marginLeft: '5px'
                        }}>
                        Sign Up
                    </Link>
                </div>
            </div>

        </div>
    )
}
