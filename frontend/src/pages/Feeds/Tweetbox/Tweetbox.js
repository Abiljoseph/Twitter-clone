import React, { useState } from 'react';
import './Tweetbox.css';
import { Avatar, Button } from "@mui/material";
import AddPhotoAlternateOutlinedIcon from '@mui/icons-material/AddPhotoAlternateOutlined';
import axios from "axios";
import { useAuthState } from 'react-firebase-hooks/auth';
import auth from '../../../firebase.init';



const Tweetbox = () => {
    const [post, setPost] = useState('')
    const [imageURL, setImageURL] = useState('');
    const [userProfilePic, setUserProfilePic] = useState(' ');
    const [isLoading, setIsLoading] = useState(false);
    const [name, setName] = useState('');
    const [username, setUsername] = useState(' ');
    // const [loggedInUser] = useLoggedInUser();
    const user = useAuthState(auth);
    const email = user[0]?.email;

    const handleUploadImage = (e) => {

        setIsLoading(true);

        const image = e.target.files[0];
        const formData = new FormData();
        formData.set('image', image)

        axios.post("https://api.imgbb.com/1/upload?key=c2e4f8c0623eda4a072a4df720d0deb3", formData)
            .then(res => {
                setImageURL(res.data.data.display_url)
                console.log(res.data.data.display_url);
                setIsLoading(false);
            })
            .catch((error) => {
                console.log(error);
                setIsLoading(false);
            })
    }
    const handleTweet = (e) => {
        e.preventDefault();
        if (user[0].providerData[0].providerId === "password") {
            fetch(`http://localhost:5000/loggedInUser?email=${email}`)
                .then(res => res.json())
                .then(data => {
                    console.log("from logged in user", data)
                    console.log(data[0]);
                    setName(data[0]?.name)
                    setUsername(data[0]?.email?.split("@")[0])
                    setUserProfilePic(data[0]?.profileImage)
                });
        } else {
            setName(user?.displayName)
            setUsername(email?.split("@")[0])
        }
        console.log();

        if (imageURL || post) {
            const userPost = {
                profilePhoto: userProfilePic,
                post: post,
                photo: imageURL,
                username: username,
                email: email,
                name: name
            }
            console.log(userPost);
            fetch(`http://localhost:5000/post`, {
                method: "POST",
                headers: {
                    'content-type': 'application/json'
                },
                body: JSON.stringify(userPost)
            })
                .then(res => res.json())
                .then(data => {
                    console.log(data);
                })
            setPost("");
            setImageURL("");
        }


    }

    return (
        <div className="tweetBox">
            <form onSubmit={handleTweet}>
                <div className="tweetBox__input">
                    <Avatar
                    //  src={loggedInUser[0]?.profileImage ? loggedInUser[0]?.profileImage : "https://cdn.pixabay.com/photo/2016/08/08/09/17/avatar-1577909_960_720.png"}
                    />
                    <input
                        type="text"
                        placeholder="What's happening?"
                        onChange={(e) => setPost(e.target.value)}
                        value={post}
                        required
                    />

                </div>
                <div className="imageIcon_tweetButton">
                    <label htmlFor='image' className="imageIcon">
                        {
                            isLoading ? <p>Uploading Image</p> : <p>{imageURL ? 'Image Uploaded' : <AddPhotoAlternateOutlinedIcon />}</p>
                        }
                    </label>
                    <input
                        type="file"
                        id='image'
                        className="imageInput"
                        onChange={handleUploadImage}
                    />
                    <Button className="tweetBox__tweetButton" type="submit">Tweet</Button>
                </div>
            </form>

        </div>
    )
}

export default Tweetbox