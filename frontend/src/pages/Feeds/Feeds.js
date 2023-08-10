import React, { useEffect, useState } from 'react';
import './Feeds.css';
import '../Pages.css';
import Tweetbox from "./Tweetbox/Tweetbox";
import Post from "./Posts/Post"

const Feeds = () => {

    const [posts, setPosts] = useState([]);

    useEffect(() => {
        fetch('http://localhost:5000/post')
            .then(res => res.json())
            .then(data => {
                setPosts(data);
            }, [posts])
    })

    return (
        <div className="feed">
            <div className="feed__header">
                <h2>Home</h2>
            </div>
            <Tweetbox />
            {
                posts.map(p => <Post key={p._id} p={p} />)
            }
        </div>

    )
}

export default Feeds
