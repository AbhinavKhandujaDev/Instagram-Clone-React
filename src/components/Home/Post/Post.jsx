import React, { useState, useEffect } from 'react';
import './Post.css';
import Avatar from '../../Avatar/Avatar';
import * as images from "../../../common-files/image-urls"
import { currentUser } from "../../../FirebaseFiles/firebase.js"
import { fetchUser } from '../../../FirebaseFiles/FirebaseFunctions'

let msg = images.msgUnsel;
let heartUnsel = images.heartUnselected;
let heartSel = images.heartSelected;
let comment = images.comment;
let bookmark = images.bookmarkUnsel;
let menuDots = images.menuDots;

function Post(prop) { 
    const [owner, setOwner] = useState({});

    const { post, heartSelected } = prop;

    let heartImg = heartSelected ? heartSel : heartUnsel

    useEffect(() => {
        fetchUser(post.ownerUid, (user) => {
            setOwner(user);
        })
    }, []);

    // let staticImage = "https://images.unsplash.com/photo-1525609004556-c46c7d6cf023?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=689&q=80";
    return (
        <div className="Post default-border-box">
            <div className="info bottom-border">
                <Avatar
                    imageUrl={owner.profileImageUrl}
                    alt={owner.name}
                />
                <b>{owner.name}</b>
                <div className="spacer" />
                <img className="menu-dots" src={menuDots} alt="" />
            </div>

            <img className="post-image" src={post.imageUrl} alt="" />

            <div className="actions-div">
                <img onClick={(e) => {console.log('aaaa')}} className="action-image heart" src={heartImg} alt="" srcSet="" />
                <img className="action-image" src={comment} alt="" srcSet="" />
                <img className="action-image" src={msg} alt="" srcSet="" />
                
                <div className="spacer" />
                
                <img className="action-image profile-icon" src={bookmark} alt="" srcSet="" />
            </div>
        </div>
    );
}

export default React.memo(Post);