import React, { useState, useEffect } from 'react';
import './Navbar.css'
import * as images from '../../../common-files/image-urls';
import DefaultTextField from '../../DefaultTextField/DefaultTextField'
import Avatar from '../../Avatar/Avatar';
import {fetchUser } from '../../../FirebaseFiles/FirebaseFunctions';
import {currentUserId} from '../../../FirebaseFiles/firebase.js'

let home = images.homeSelected;
let msg = images.msgUnsel;
let heart = images.heartUnselected;
let logo = images.logo;

function Navbar() {
    const [owner, setOwner] = useState({});
    useEffect(() => {
        fetchUser(currentUserId, (user) => {
            setOwner(user);
        })
    }, []);
    return (
        <nav className="Navbar flex-center bottom-border">
            <div className="content-view flex-center">
                <img className="logo" src={logo} alt="" srcSet="" />
                <DefaultTextField placeholder="Search" value="" />
                <div className="nav-buttons-div">
                    <img className="nav-buttons" src={home} alt="" srcSet="" />
                    <img className="nav-buttons" src={msg} alt="" srcSet="" />
                    <img className="nav-buttons" src={heart} alt="" srcSet="" />
                    <Avatar imageUrl={owner.profileImageUrl} alt={owner.name}/>
                </div>
            </div>
        </nav>
    )
}

export default React.memo(Navbar);