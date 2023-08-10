import React, { useState } from 'react';
import TwitterHomeimg from '../../assets/images/twitter-splash.jpg';
import TwitterIcon from '@mui/icons-material/Twitter';
import { useCreateUserWithEmailAndPassword, useSignInWithGoogle } from 'react-firebase-hooks/auth';
import auth from '../../firebase.init';
import { Link, useNavigate } from 'react-router-dom';
import GoogleButton from 'react-google-button';
import "./SignUp.css"
import axios from 'axios';

export default function SignUp() {

    const [email, setEmail] = useState('');
    const [password, setPassword] = useState();
    const [firstName, setFirstName] = useState();
    const [secondName, setSecondName] = useState();

    const navigate = useNavigate()

    const [
        createUserWithEmailAndPassword,
        user,
        loading,
        error,
    ] = useCreateUserWithEmailAndPassword(auth);

    const [signInWithGoogle, GoogleUser, GoogleLoading, GoogleError] = useSignInWithGoogle(auth);



    const handleGoogleSignIn = () => {
        signInWithGoogle();
    }

    const handleSubmit = (e) => {
        e.preventDefault();
        createUserWithEmailAndPassword(email, password);
        const user = {
            name: firstName + " " + secondName,
            email: email
        }
        const { data } = axios.post('http://localhost:5000/register', user);
        navigate("/login");
    }

    return (
        <div className='login-container'>
            <div className="image-container">
                <img className='Twitter-img' src={TwitterHomeimg} alt="TwitterLogin_img" />
            </div>
            <div className="form-container">
                <TwitterIcon />
                <h2>Happening now</h2>
                <form onSubmit={handleSubmit} >
                    <input type="text" className='username'
                        placeholder='Enter your First name'
                        onChange={(e) => setFirstName(e.target.value)}
                    />
                    <input type="text" className='username'
                        placeholder='Enter your Second name'
                        onChange={(e) => setSecondName(e.target.value)}
                    />
                    <input type="email" className='email'
                        placeholder='Enter your email'
                        onChange={(e) => setEmail(e.target.value)}
                    />


                    <input type="password" className='password'
                        placeholder='Password'
                        onChange={(e) => setPassword(e.target.value)}
                    />
                    <div className="btn-login">
                        <button type='submit' className='btn'>Sign Up</button>
                    </div>
                </form>
                <hr />
                <div className='google-button'>
                    <GoogleButton
                        className='g-btn'
                        type='light'
                        onClick={handleGoogleSignIn}
                    />
                </div>
                <div>
                    Already have an account?
                    <Link to={'/login'}
                        style={{
                            textDecoration: 'none',
                            color: 'skyblue',
                            fontWeight: '600',
                            marginLeft: '5px'
                        }}>
                        Login
                    </Link>
                </div>
            </div>

        </div>
    )
}
