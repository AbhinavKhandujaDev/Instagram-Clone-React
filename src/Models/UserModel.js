import {
    dbref,
    userFeedRef,
    userPostsRef,
    currentUserId,
    followIntValue,
    notificationsRef
} from '../FirebaseFiles/firebase.js';

let followUnfollow =  {
    following: "user-following",
    follower: "user-follower"
}

export default class UserModel {
    constructor(uid = null, snapshot) {
        this.name =  snapshot.name;
        this.username =  snapshot.username;
        this.profileImageUrl =  snapshot.profileImageUrl;
        
        this.uid = uid != null ? uid : snapshot.uid;
        this.isFollowed = false;
    }    

    follow(done) {
        let id = this.uid;
        dbref.child(followUnfollow.following).child(currentUserId).update({id: 1}, error => {
            if (error !== null) {
                done(false);
                return
            }
            this.uploadFollowNotifToServer()
            dbref.child(followUnfollow.follower).child(this.uid).push({currentUserId: 1}, () => {
                userPostsRef.child(this.uid).once('value', snapshot => {
                    let val = snapshot.val();
                    userFeedRef.child(currentUserId).update(val);
                })
                this.isFollowed = true
                done(true);
            })
        })
    }

    uploadFollowNotifToServer() {
        let date = new Date().getTime();
        if (currentUserId === this.uid) { return }
        let values = {
            checked: 0,
            creationDate: date,
            uid: currentUserId,
            type: followIntValue
        }
        notificationsRef.child(this.uid).push(values);
    }
}