import React from 'react';
import '../Pages.css';
import { useAuthState } from 'react-firebase-hooks/auth';
import auth from '../../firebase.init';
import Mainpage from './Mainpage/Mainpage';

const Profile = () => {

    const user = useAuthState(auth);

    return (
        <div className='profilePage'>
            <Mainpage user={user} />
        </div>
    )
}

export default Profile