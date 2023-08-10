import React, { useEffect, useState } from 'react'
import { useAuthState } from 'react-firebase-hooks/auth';
import auth from '../firebase.init';

const useLoggedInUser = () => {
    const user = useAuthState(auth);
    const email = user[0]?.email;
    const [loggedInUser, setLoggedInUser] = useState({});

    // console.log(loggedInUser);
    useEffect(() => {
        fetch(`http://localhost:5000/loggedInUser?email=${email}`)
            .then(res => res.json())
            .then(data => {
                // console.log("from logged in user", data)
                setLoggedInUser(data)
            });

    },
        [email, loggedInUser]
    )
    return [loggedInUser, setLoggedInUser]

}

export default useLoggedInUser