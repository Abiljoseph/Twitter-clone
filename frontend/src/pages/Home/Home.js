import React from 'react'
import Sidebar from '../Sidebar/Sidebar';
import Widgets from '../Widgets/Widgets';
import Feeds from '../Feeds/Feeds';
import { useAuthState } from 'react-firebase-hooks/auth';
import { signOut } from 'firebase/auth';
import auth from '../../firebase.init';
import { Outlet } from 'react-router-dom';
import useLoggedInUser from '../../hooks/useLoggedInUser';


export default function Home() {

    const user = useAuthState(auth)
    console.log(user);

    // const [loggedInUser] = useLoggedInUser();

    // console.log(loggedInUser);

    const handleLogout = () => {
        signOut(auth)
    }

    return (
        <div className='app'>
            <Sidebar handleLogout={handleLogout} user={user} />
            <Outlet />
            <Widgets />

        </div>
    )
}
