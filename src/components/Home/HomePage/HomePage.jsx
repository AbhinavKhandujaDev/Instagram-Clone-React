import React, { useState, useEffect } from 'react';
import Navbar from '../Navbar/Navbar.jsx';
import Post from '../Post/Post';
import './HomePage.css';
import { fetchLimitedPost } from '../../../FirebaseFiles/FirebaseFunctions';

let currentKey;
let initialCount = 2
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
    }, []);
    return (
        <div className="HomePage">
            <Navbar />
            <div className="home-content">
                <div className="posts flex-center">
                    {posts.map(e => <Post key={e.postId} post={e} />)}
                </div>
            </div>
        </div>
    );
}

export default React.memo(HomePage)