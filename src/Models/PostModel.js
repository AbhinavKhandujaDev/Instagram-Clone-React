import UserModel from './UserModel';
import { fetchUser } from '../FirebaseFiles/FirebaseFunctions';
import {
    currentUserId,
    userLikesRef,
    postLikesRef,
    notificationsRef,
    likeIntValue,
    postsRef
} from '../FirebaseFiles/firebase.js';

export default class PostModel {
    constructor(postId, snapshot) {
        this.caption = snapshot.caption || null;
        this.createdAt = snapshot.createdAt || null;
        this.imageUrl = snapshot.imageUrl || null;
        this.likes = snapshot.likes || null;
        this.ownerUid = snapshot.uid || null;

        this.postId = postId || null;

        this.didLike = false;

        if (this.ownerUid !== null) {
            fetchUser(this.ownerUid, (userData) => {
                let user = new UserModel(userData);
                this.user = user || null;
            })
        }

        this.adjustLikes = this.adjustLikes.bind(this);
    }

    adjustLikes(addLike, completion = () => ({})) {
        if (addLike) {
            //update like from user-like structure
            let value = { postId: 1 }
            userLikesRef.child(currentUserId).update(value).then(() => {
                this.sendLikeNotifToServer()
                postLikesRef.child(this.postId).update({ currentUserId: 1 }).then(() => {
                    this.likes += 1;
                    this.didLike = true;
                    completion(this.likes);
                    postsRef.child(this.postId).update({ likes: this.likes })
                })
            })
        } else {
            userLikesRef.child(currentUserId).child(this.postId).once('value', (snapshot) => {
                let notificationId = snapshot.key;
                notificationsRef.child(this.ownerUid).child(notificationId).remove(() => {
                    //remove like from user-like structure
                    userLikesRef.child(currentUserId).child(this.postId).remove(() => {
                        //remove like from post-like structure
                        postLikesRef.child(this.postId).child(currentUserId).remove(() => {
                            if (this.likes <= 0) { return }
                            this.likes -= 1;
                            this.didLike = false;
                            completion(this.likes);
                            postsRef.child(this.postId).update({ likes: this.likes });
                        })
                    })
                })
            })
        }
    }

    sendLikeNotifToServer() {
        let date = new Date().getTime();
        let notif = notificationsRef.child(this.ownerUid).child(this.postId).push();
        userLikesRef.child(currentUserId).child(this.postId).set(notif.key);
        if (currentUserId === this.ownerUid) { return }
        let values = {
            checked: 0,
            creationDate: date,
            uid: currentUserId,
            type: likeIntValue,
            postId: this.postId
        }
        notif.update(values);
    }
}