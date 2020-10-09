import React, { useState, useEffect } from 'react';
import './Post.css';
import {bubble} from '../../../common-files/animations';
import Avatar from '../../Avatar/Avatar';
import * as images from "../../../common-files/image-urls"
import { userLikesRef, currentUserId } from "../../../FirebaseFiles/firebase.js"
import { fetchUser } from '../../../FirebaseFiles/FirebaseFunctions'
import CustomButton from "../../CustomButton";

let msg = images.msgUnsel;
let heartUnsel = images.heartUnselected;
let heartSel = images.heartSelected;
let comment = images.comment;
let bookmarkSel = images.bookmarkSel;
let bookmarkUnsel = images.bookmarkUnsel;
let menuDots = images.menuDots;

function Post(prop) {

    let states = {
        post: {},
        owner: {},
        bookmarked: false
    }

    const [allStates, setStates] = useState(states);

    const { post } = prop;

    useEffect(() => {
        fetchUser(post.ownerUid, (user) => {
            userLikesRef.child(currentUserId).once('value', (ss) => { //checks if User has liked post
                post.didLike = ss.hasChild(post.postId);
                setStates(prevState => ({
                    ...prevState,
                    owner: user,
                    post: post
                }));
            })
        })
    }, []);

    return (
        <div className="Post default-border-box">
            <div className="info bottom-border">
                <Avatar
                    imageUrl={allStates.owner.profileImageUrl}
                    alt={allStates.owner.name}
                />
                <b>{allStates.owner.name}</b>
                <div className="spacer" />
                <img className="menu-dots" src={menuDots} alt="" />
            </div>

            <img className="post-image" src={post.imageUrl} alt="" />

            <p className="caption">{allStates.post.caption}</p>

            <div className="actions-div">
                <CustomButton
                    id='heart'
                    imageSelected={heartSel}
                    imageUnselected={heartUnsel}
                    selected={allStates.post.didLike}
                    onTap={() => {
                        allStates.post.adjustLikes(!allStates.post.didLike);
                        setStates(prevState => ({
                            ...prevState,
                            post: {
                                ...prevState.post,
                                didLike: !prevState.post.didLike
                            }
                        }))
                        bubble(document.getElementById('heart'))
                    }}
                />

                <CustomButton imageUnselected={comment} />

                <CustomButton imageUnselected={msg} />

                <div className="spacer" />

                <CustomButton
                    imageSelected={bookmarkSel}
                    imageUnselected={bookmarkUnsel}
                    selected={allStates.bookmarked}
                    onTap={() => {
                        setStates(prevState => ({
                            ...prevState,
                            bookmarked: !prevState.bookmarked
                        }))
                    }}
                />
            </div>
        </div>
    );
}

export default React.memo(Post);