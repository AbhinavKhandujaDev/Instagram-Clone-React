import React, { useState, useEffect } from 'react';
import Navbar from '../Navbar/Navbar.jsx';
import Post from '../Post/Post';
import Profile from '../Profile/Profile'
import './HomePage.css';
import { fetchLimitedPost } from '../../../FirebaseFiles/FirebaseFunctions';
import {
    BrowserRouter as Router,
    Switch,
    Route
} from "react-router-dom";
import Inbox from "../Inbox/Inbox"

let currentKey;
let initialCount = 1
let furtherCount = 5

function HomePage() {
    const [posts, setPosts] = useState([]);
    useEffect(() => {
        let all = []
        fetchLimitedPost(currentKey, initialCount, furtherCount, (lastPostKey) => {
            currentKey = lastPostKey
        }, (post) => {
            all.push(post);
            if (all.length === initialCount) { setPosts(posts.concat(all)) }
        })
    });

    return (
        <div className="HomePage flex-center">
            <Router>
                <Navbar />
                <Switch>
                    <Route exact path="/"> <HomeFeeds posts={posts} /> </Route>
                    <Route exact path="/inbox"> <Inbox /> </Route>
                    <Route exact path={`/${localStorage.getItem('username')}`}> <Profile /> </Route>
                </Switch>
            </Router>
        </div>
    );
}

const HomeFeeds = (props) => {
    let {posts} = props;
    return (
        <div style={{marginTop: '40px'}} className="home-content">
            <div className="posts flex-center">
                {posts.map(e => <Post key={e.postId} post={e} />)}
            </div>
        </div>
    );
}

const Chats = () => {
    return (
        <h1 className="chats flex-center">Chats</h1>
    )
}

const ProfileObj = () => {
    let url = window.location.href;
    let array = url.split('/');
    let username = array[array.length - 1];
    console.log('url ' +url);

    // useEffect(() => {
        
    // },[])

    return ( <Profile username={username}/> )
}

export default React.memo(HomePage)