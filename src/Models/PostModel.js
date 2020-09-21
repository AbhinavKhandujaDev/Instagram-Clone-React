import UserModel from './UserModel';
import {fetchUser} from '../FirebaseFiles/FirebaseFunctions';

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
    }
}