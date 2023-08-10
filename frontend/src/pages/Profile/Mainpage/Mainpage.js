import React, { useEffect, useState } from 'react';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import { useNavigate } from 'react-router-dom';
import useLoggedInUser from '../../../hooks/useLoggedInUser';
import CenterFocusStrongIcon from '@mui/icons-material/CenterFocusStrong';
import CenterFocusWeakIcon from '@mui/icons-material/CenterFocusWeak';
import AddLinkIcon from '@mui/icons-material/AddLink';
import MyLocationIcon from '@mui/icons-material/MyLocation';
import LockResetIcon from '@mui/icons-material/LockReset';
import Post from '../../Feeds/Posts/Post';
import './Mainpage.css';
import axios from 'axios';
import EditProfile from '../EditProfile/EditProfile';

const Mainpage = ({ user }) => {
    const navigate = useNavigate()
    const loggedInUser = useLoggedInUser();
    const username = user[0].email.split('@')[0];

    const [posts, setPosts] = useState([]);

    const [isLoading, setIsLoading] = useState('');
    // const [ imageURL, setImageURL] = useState[''];

    useEffect(() => {
        fetch(`http://localhost:5000/userPost?email=${user[0]?.email}`)
            .then(res => res.json())
            .then(data => {
                setPosts(data);
            }, [posts])
    })

    const handleUploadCoverImage = (e) => {
        setIsLoading(true);

        const image = e.target.files[0];
        const formData = new FormData();
        formData.set('image', image)

        axios.post("https://api.imgbb.com/1/upload?key=c2e4f8c0623eda4a072a4df720d0deb3", formData)
            .then(res => {
                const url = res.data.data.display_url;
                const userCoverImage = {
                    email: user[0]?.email,
                    coverImage: url
                }
                setIsLoading(false);
                if (url) {
                    axios.patch(`http://localhost:5000/userUpdate/${user[0]?.email}`, userCoverImage)
                }
            })
    }
    const handleUploadProfileImage = (e) => {
        setIsLoading(true);

        console.log("inside function");

        const image = e.target.files[0];
        const formData = new FormData();
        formData.set('image', image);
        axios.post("https://api.imgbb.com/1/upload?key=c2e4f8c0623eda4a072a4df720d0deb3", formData)
            .then(res => {
                const url = res.data.data.display_url;
                const userProfileImage = {
                    email: user[0]?.email,
                    profileImage: url
                }

                setIsLoading(false);
                if (url) {
                    axios.patch(`http://localhost:5000/userUpdate/${user[0]?.email}`, userProfileImage)
                }
            })
    }

    return (
        <div>
            <ArrowBackIcon className='arrow-icon' onClick={() => { navigate('/') }} />
            <h4>@{username}</h4>
            <div className='mainProfile'>
                <div className='profile-bio'>
                    {
                        <div>
                            <div className='coverImageContainer'>
                                <img src={loggedInUser[0][0]?.coverImage ? loggedInUser[0][0]?.coverImage : 'https://i.pinimg.com/736x/cb/18/a5/cb18a5c37122194375bf51a4b903d962--blog-headers-twitter-backgrounds.jpg'}
                                    alt='' className='coverImage'
                                />
                                <div className='hoverCoverImage'>
                                    <label htmlFor='image' className='imageIcon'>
                                        {
                                            isLoading ? <LockResetIcon className='photoIcon photoIconDisabled' /> : <CenterFocusStrongIcon className='photoIcon' />
                                        }

                                    </label>
                                    <div className='imageIcon_TweetButton'>
                                        <input type='file' id='image' className='imageInput' onChange={handleUploadCoverImage} />
                                    </div>
                                </div>
                            </div>
                            <div className='avatar_img'>
                                <div className='avatarContainer'>
                                    <img src={loggedInUser[0][0]?.profileImage ? loggedInUser[0][0]?.profileImage : "https://cdn.pixabay.com/photo/2016/08/08/09/17/avatar-1577909_960_720.png"} className="avatar" alt='' />
                                    <div className='hoverAvatarImage'>
                                        <div className="imageIcon_tweetButton">
                                            <label htmlFor='profileImage' className="imageIcon">
                                                {
                                                    isLoading ?
                                                        <LockResetIcon className='photoIcon photoIconDisabled ' />
                                                        :
                                                        <CenterFocusWeakIcon className='photoIcon' />
                                                }
                                            </label>
                                            <input
                                                type="file"
                                                id='profileImage'
                                                className="imageInput"
                                                onChange={handleUploadProfileImage}
                                            />
                                        </div>
                                    </div>
                                </div>
                                <div className='userInfo'>
                                    <div>
                                        <h3 className='heading-3'>
                                            {loggedInUser[0][0]?.name ? loggedInUser[0][0]?.name : user && user?.displayName}
                                        </h3>
                                        <p className='usernamesection'>
                                            @{username}
                                        </p>
                                    </div>
                                    <div className='infoContainer'>

                                        {loggedInUser[0]?.bio ? loggedInUser[0]?.bio : ''}

                                        <div className='locationAndLink'>
                                            {loggedInUser[0][0]?.location ? <p className='subInfo'><MyLocationIcon /> {loggedInUser[0][0].location}</p> : ''}
                                            {loggedInUser[0][0]?.website ? <p className='subInfo link'><AddLinkIcon /> {loggedInUser[0][0].website}</p> : ''}
                                        </div>
                                    </div>
                                    <div>
                                        <EditProfile user={user} loggedInUser={loggedInUser} />
                                    </div>
                                    <hr />
                                </div>
                                <div>
                                    <h4 className='tweetsText'>Tweets</h4>
                                </div>
                                {
                                    posts.map(p => <Post id={p.id} p={p} />)
                                }
                            </div>
                        </div>
                    }

                </div>
            </div>
        </div>
    )
}

export default Mainpage