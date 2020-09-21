import UserModel from './UserModel';
import {fetchUser} from '../FirebaseFiles/FirebaseFunctions';
import {currentUserId, userLikesRef} from '../FirebaseFiles/firebase.js';

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
        // this.adjustLikes = this.adjustLikes.bind(this);
    }

    // adjustLikes(addLike, completion) {
    //     if (addLike) {
    //         //update like from user-like structure
    //         let value = {postId: 1}
    //         userLikesRef.child(currentUserId).update(values)
    //     }
    // }
}