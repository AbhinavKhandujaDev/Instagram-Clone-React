import * as firebase from './firebase.js';
import PostModel from '../Models/PostModel.js'

export function fetchLimitedPost(currentKey, initialCount, furtherCount, lastPostId, postFetched) { 
    if (currentKey == null) {
        firebase.userFeedRef.child(firebase.currentUserId).limitToLast(initialCount).once('value', (postsSnapshot) => {
            let keys = Object.keys(postsSnapshot.val());
            postsSnapshot.forEach(function(childSnapshot) {
                let key = childSnapshot.key
                fetchSinglePost(key, (model) => {
                    postFetched(model);
                })
            });
            lastPostId(keys[0]);
        })
    }else {
        firebase.userFeedRef.orderByKey().limitToLast(furtherCount).once('value', (snapshot) => {
            let keys = Object.keys(snapshot.val());
            snapshot.forEach(function(childSnapshot) {
                let key = childSnapshot.key
                if (key !== currentKey) {
                    fetchSinglePost(key, (model) => {
                        postFetched(model);
                    })
                }
            });
            lastPostId(keys[0]);
        })
    }
 }

 export function fetchSinglePost(postId, completion) {
    firebase.postsRef.child(postId).once('value', function (snapshot) {
        let model = new PostModel(postId, snapshot.val());
        completion(model);
    })
}

export function fetchUser(uid, fetched) {
    firebase.usersRef.child(uid).once('value', (snapshot) => {
        fetched(snapshot.val())
    })
}