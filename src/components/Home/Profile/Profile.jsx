import React, { useState, useEffect } from 'react'
import Avatar from '../../Avatar/Avatar';
import './Profile.css';
import { userFollowerRef, userFollowingRef, userPostsRef, getPathName } from '../../../FirebaseFiles/firebase.js';
import { fetchUserByUsername, fetchLimitedPost } from '../../../FirebaseFiles/FirebaseFunctions';
import User from '../../../Models/UserModel'

let currentKey;
let initialCount = 10
let furtherCount = 5

function Profile() {
    let userDet = {
        details: {},
        posts: '•',
        followers: '•',
        following: '•'
    }

    let [user, setUser] = useState(userDet);
    let [posts, setPosts] = useState([]);

    useEffect(() => {
        //fetching user by username
        fetchUserByUsername(getPathName(), (uid, userData) => {
            let fetcheduser = new User(uid, userData);
            userDet['details'] = fetcheduser

            //fetching followers
            userFollowerRef.child(uid).once('value', ss => {
                userDet['followers'] = Object.keys(ss).length

                //fetching following
                userFollowingRef.child(uid).once('value', ss => {
                    userDet['following'] = Object.keys(ss).length

                    //fetching user posts count
                    userPostsRef.child(uid).on('value', ss => {
                        userDet['posts'] = Object.keys(ss).count
                        setUser(userDet);

                        //fetching user posts
                        let all = []
                        fetchLimitedPost(currentKey, initialCount, furtherCount, (lastPostKey) => {
                            currentKey = lastPostKey
                        }, (post) => {
                            all.push(post);
                            if (all.length === initialCount) {
                                userDet['posts'] = all.length
                                setPosts(posts.concat(all))
                            }
                        })
                    })
                })
            })
        });
    }, [])

    return (
        (user == null) ? <div />
            : <div className="Profile">
                <div className="profile-detail flex-center bottom-border">
                    <Avatar borderColor="transparent" imageUrl={user.details.profileImageUrl} />
                    <div className="spacer"></div>
                    <div className="right-details">
                        <label id="username">{user.details.username}</label>

                        <div className="detail1">
                            <ActivityDetail
                                posts={user.posts}
                                followers={user.followers}
                                following={user.following}
                            />
                        </div>

                    </div>
                </div>

                <div className="detail2 bottom-border">
                    <ActivityDetail
                        posts={user.posts}
                        followers={user.followers}
                        following={user.following}
                    />
                </div>

                <div className="posts-grid">
                    {posts.map(post =>
                        <div key={post.imageUrl}>
                            <img key={post.imageUrl} className="post-image" src={post.imageUrl} alt="" />
                        </div>
                    )}
                </div>

            </div>
    )
}

const ActivityDetail = (props) => {
    let { posts = 0, followers = 0, following = 0 } = props;
    return (
        <div className="ActivityDetail">
            <div className="posts-count count-box">
                <label className="detail"> {posts} </label>
                <label className="title"> posts </label>
            </div>
            <div className="followers-count count-box">
                <label className="detail"> {followers} </label>
                <label className="title"> followers </label>
            </div>
            <div className="following-count count-box">
                <label className="detail"> {following} </label>
                <label className="title"> following </label>
            </div>
        </div>
    );
}

export default React.memo(Profile)
