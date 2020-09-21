import "firebase/auth";
import "firebase/database"
import "firebase/storage"

export var firebase = require("firebase/app");

export var firebaseConfig = {
  apiKey: "AIzaSyDtsIWnGVm6sAaGjq5yXnZVfM5f2eBC-Yg",
  authDomain: "instagramclone-1ee13.firebaseapp.com",
  databaseURL: "https://instagramclone-1ee13.firebaseio.com",
  projectId: "instagramclone-1ee13",
  storageBucket: "instagramclone-1ee13.appspot.com",
  messagingSenderId: "274123875123",
  appId: "1:274123875123:web:f78a8e175a965a90321446",
  measurementId: "G-6EZZXMNJP8"
};

firebase.initializeApp(firebaseConfig);

export var storage = firebase.storage().ref();
export var dbref = firebase.database().ref();

export var usersRef = dbref.child("users");
export var postsRef = dbref.child("posts");
export var userFeedRef = dbref.child("user-feed");
export var userPostsRef = dbref.child("user-posts");
export var userLikesRef = dbref.child("user-likes");
export var postLikesRef = dbref.child("post-likes");
export var userFollowerRef = dbref.child("user-follower");
export var commentsRef = dbref.child("comments");
export var notificationsRef = dbref.child("notifications");
export var messagesRef = dbref.child("messages");
export var userMessagesRef = dbref.child("user-messages");
export var hashtagPostsRef = dbref.child("hashtag-post");
export var profileImageStorageRef = storage.child("profile_images");

export var currentUserId = localStorage.getItem("user");