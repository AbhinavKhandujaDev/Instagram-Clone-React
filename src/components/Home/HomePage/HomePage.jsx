import React, { useState, useEffect, useRef } from 'react';
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

let initialCount = 1
let furtherCount = 5

function HomePage() {
    const [posts, setPosts] = useState([]);
    let currentKey = useRef(null)

    useEffect(() => {
        let all = []
        fetchLimitedPost(currentKey.current, initialCount, furtherCount, (lastPostKey) => {
            currentKey.current = lastPostKey
        }, (post) => {
            all.push(post);
            if (all.length === initialCount) { setPosts(posts.concat(all)) }
        })
    });

    return (
        <div className="HomePage flex-center">
            <Router>
                <Navbar />
                <div className="main flex-center">
                    <Switch>
                        <Route exact path="/"> <HomeFeeds posts={posts} /> </Route>
                        <Route exact path="/inbox"> <Inbox /> </Route>
                        <Route exact path={`/${localStorage.getItem('username')}`}> <Profile /> </Route>
                    </Switch>
                </div>
            </Router>
        </div>
    );
}

const HomeFeeds = (props) => {
    let { posts } = props;
    return (
        <div style={{ marginTop: '80px' }} className="home-content">
            <div className="posts flex-center">
                {posts.map(e => <Post key={e.postId} post={e} />)}
            </div>
        </div>
    );
}

export default React.memo(HomePage)