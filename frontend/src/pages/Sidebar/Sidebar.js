import React, { useState } from 'react';
import './Sidebar.css';
import TwitterIcon from '@mui/icons-material/Twitter';
import Sidebaroptions from './Sidebaroptions';
import HomeIcon from '@mui/icons-material/Home';
import SearchIcon from '@mui/icons-material/Search';
import NotificationsActiveIcon from '@mui/icons-material/NotificationsActive';
import BookmarkIcon from '@mui/icons-material/Bookmark';
import ListAltIcon from '@mui/icons-material/ListAlt';
import PermIdentityIcon from '@mui/icons-material/PermIdentity';
import MoreHorizIcon from '@mui/icons-material/MoreHoriz';
import DoneIcon from '@mui/icons-material/Done';
import ListIcon from '@mui/icons-material/List';
import MailOutlineIcon from '@mui/icons-material/MailOutline';
import { Avatar, Button, Divider, IconButton, ListItemIcon, Menu, MenuItem } from '@mui/material';
import CustomLink from './CustomLink';
import useLoggedInUser from '../../hooks/useLoggedInUser';


const Sidebar = ({ handleLogout, user }) => {
    const [anchorE1, setanchorE1] = useState(null);
    const openMenu = Boolean(anchorE1);
    const [loggedInUser] = useLoggedInUser();


    const userProfilePic = loggedInUser[0]?.profileImage ? loggedInUser[0]?.profileImage : "https://thumbs.dreamstime.com/b/default-avatar-profile-icon-vector-social-media-user-image-182145777.jpg";
    const handleClick = (e) => {
        setanchorE1(e.currentTarget);
        // setOpenMenu(anchorE1);
    }
    const handleClose = () => {
        setanchorE1(null);
        // setOpenMenu(null);
    }

    const result = user[0]?.email?.split("@")[0];

    return (
        <div className='sidebar'>
            <TwitterIcon className='sidebar-twitterIcon' />
            <CustomLink to={'/home/feed'}>
                <Sidebaroptions active Icon={HomeIcon} text='Home' />
            </CustomLink>
            <CustomLink to={'/home/explore'}>
                <Sidebaroptions active Icon={SearchIcon} text='Explore' />
            </CustomLink>
            <CustomLink to={'/home/notification'}>
                <Sidebaroptions active Icon={NotificationsActiveIcon} text='Notification' />

            </CustomLink>
            <CustomLink to={'/home/bookmark'}>
                <Sidebaroptions active Icon={BookmarkIcon} text='Bookmark' />
            </CustomLink>
            <CustomLink to={'/home/lists'}>
                <Sidebaroptions active Icon={ListAltIcon} text='Lists' />
            </CustomLink>
            <CustomLink to={'/home/messages'}>
                <Sidebaroptions active Icon={MailOutlineIcon} text='Messages' />
            </CustomLink>
            <CustomLink to={'/home/profile'}>
                <Sidebaroptions active Icon={PermIdentityIcon} text='Profile' />
            </CustomLink>
            <CustomLink to={'/home/more'}>
                <Sidebaroptions active Icon={MoreHorizIcon} text='More' />
            </CustomLink>

            <Button variant='outlined' className='sidebar_tweet'>
                Tweet
            </Button>

            <div className='profile_info'>
                <Avatar src={userProfilePic} />
                <div className='user_info'>
                    <h4>{loggedInUser[0]?.name ? loggedInUser[0]?.name : user && user?.displayName}  </h4>
                    <h5>@{result}</h5>
                </div>
                <IconButton
                    size='small'
                    sx={{ ml: 2 }}
                    aria-controls={openMenu ? "basic-menu" : undefined}
                    aria-haspopup="true"
                    aria-expanded={openMenu ? "true" : undefined}
                    onClick={handleClick}
                >
                    <MoreHorizIcon />
                </IconButton>
                <Menu id='basic-menu' anchorEl={anchorE1} open={openMenu} onClose={handleClose}>
                    <MenuItem className='profile_info1'>
                        <Avatar src={userProfilePic} />
                        <div className='user_info subUser_info'>
                            <div>
                                <h4>{loggedInUser[0]?.name ? loggedInUser[0]?.name : user && user?.displayName}  </h4>
                                <h5>@{result}</h5>
                            </div>
                            <ListItemIcon className='done_icon'> <DoneIcon /> </ListItemIcon>
                        </div>
                    </MenuItem>
                    <Divider />
                    <MenuItem onClick={handleClose}>
                        Add an existing account
                    </MenuItem>
                    <MenuItem onClick={handleLogout}>
                        LogOut {result}
                    </MenuItem>
                </Menu>
            </div>

        </div>
    )
}

export default Sidebar;
