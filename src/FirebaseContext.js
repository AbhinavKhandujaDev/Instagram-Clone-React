import { firebase, dbref, storage } from './firebase';

export let firebaseData = {
    dbRef: dbref.ref(),
    storageRef: storage.ref(),
    usersRef: dbref.ref("users"),
    postsRef: dbref.ref("posts"),
    userFeedRef: dbref.ref("user-feed"),
    userPostsRef: dbref.ref("user-posts"),
    userLikesRef: dbref.ref("user-likes"),
    postLikesRef: dbref.ref("post-likes"),
    userFollowerRef: dbref.ref("user-follower"),
    commentsRef: dbref.ref("comments"),
    notificationsRef: dbref.ref("notifications"),
    messagesRef: dbref.ref("messages"),
    userMessagesRef: dbref.ref("user-messages"),
    hashtagPostsRef: dbref.ref("hashtag-post"),
    profileImageStorageRef: storage.ref("profile_images")
}