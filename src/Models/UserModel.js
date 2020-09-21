export default class UserModel {
    constructor(snapshot) {
        this.name =  snapshot.name;
        this.username =  snapshot.username;
        this.profileImageUrl =  snapshot.profileImageUrl;
        
        this.uid = snapshot.uid;
        this.isFollowed = false;
    }    
}