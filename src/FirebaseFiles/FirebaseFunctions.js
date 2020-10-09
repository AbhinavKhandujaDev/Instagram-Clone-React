import * as firebase from './firebase.js';
import PostModel from '../Models/PostModel.js'

const feedRef = firebase.userFeedRef 

export function fetchLimitedPost(currentKey, initialCount, furtherCount, lastPostId, postFetched) {
    if (currentKey == null) {
        feedRef.child(firebase.currentUserId).limitToLast(initialCount).once('value', (postsSnapshot) => {
            let keys = Object.keys(postsSnapshot.val());
            postsSnapshot.forEach(function (childSnapshot) {
                let key = childSnapshot.key
                fetchSinglePost(key, (model) => {
                    postFetched(model);
                })
            });
            lastPostId(keys[0], feedRef);
        })
    } else {
        feedRef.orderByKey().limitToLast(furtherCount).once('value', (snapshot) => {
            let keys = Object.keys(snapshot.val());
            snapshot.forEach(function (childSnapshot) {
                let key = childSnapshot.key
                if (key !== currentKey) {
                    fetchSinglePost(key, (model) => {
                        postFetched(model);
                    })
                }
            });
            lastPostId(keys[0], feedRef);
        })
    }
}

export function fetchSinglePost(postId, completion) {
    firebase.postsRef.child(postId).once('value', function (snapshot) {
        if (snapshot.val() !== null) {
            let model = new PostModel(postId, snapshot.val());
            completion(model);
        }
    })
}

export function fetchUser(uid, fetched) {
    firebase.usersRef.child(uid).once('value', (snapshot) => {
        fetched(snapshot.val())
    })
}

export function fetchUserByUsername(username, fetched = null) {
    firebase.usersRef.orderByChild("username").equalTo(username).once("value", function (snapshot) {
        let userData = Object.values(snapshot.val())[0];
        let uid = Object.keys(snapshot.val())[0]
        if (fetched != null) { fetched(uid, userData) }
    });
}