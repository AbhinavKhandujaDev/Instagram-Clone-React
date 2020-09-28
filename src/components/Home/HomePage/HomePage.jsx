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

                    <Route exact path="/">
                        <div className="home-content">
                            <div className="posts flex-center">
                                {posts.map(e => <Post
                                    key={e.postId}
                                    post={e}
                                    postLiked={(post) => {

                                    }}
                                />)}
                            </div>
                        </div>
                    </Route>

                    <Route exact path="/chats"> <Chats /> </Route>

                    <Route exact path={`/${localStorage.getItem('username')}`}> <Profile /> </Route>

                </Switch>
            </Router>
        </div>
    );
}

const Chats = () => {
    return (
        <h1 className="chats flex-center">Chats</h1>
    )
}

export default React.memo(HomePage)