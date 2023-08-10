import React from 'react';
import './Widgets.css';
import SearchIcon from '@mui/icons-material/Search';
import { TwitterTimelineEmbed, TwitterTweetEmbed } from 'react-twitter-embed';


const Widgets = () => {
    return (
        <div className='widgets'>
            <div className='widgets__input'>
                <SearchIcon className='widgets__searchIcon' />
                <input type='text' placeholder='SearchTwitter' />
            </div>
            <div className='widgets_widgetsContainer'>
                <h2>What's Happening</h2>
            </div>
            <TwitterTweetEmbed
                tweetId={'933354946111705097'}
            />
            <TwitterTimelineEmbed
                sourceType="profile"
                screenName="saurabhnemade"
                options={{ height: 400 }}
            />
        </div>
    )
}

export default Widgets