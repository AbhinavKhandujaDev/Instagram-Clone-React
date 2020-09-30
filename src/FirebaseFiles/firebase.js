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

export const storage = firebase.storage().ref();
export const dbref = firebase.database().ref();

export const usersRef = dbref.child("users");
export const postsRef = dbref.child("posts");
export const userFeedRef = dbref.child("user-feed");
export const userPostsRef = dbref.child("user-posts");
export const userLikesRef = dbref.child("user-likes");
export const postLikesRef = dbref.child("post-likes");
export const userFollowerRef = dbref.child("user-follower");
export const userFollowingRef = dbref.child("user-following");
export const commentsRef = dbref.child("comments");
export const notificationsRef = dbref.child("notifications");
export const messagesRef = dbref.child("messages");
export const userMessagesRef = dbref.child("user-messages");
export const hashtagPostsRef = dbref.child("hashtag-post");
export const profileImageStorageRef = storage.child("profile_images");

export const currentUserId = localStorage.getItem("user");

export const likeIntValue = 0
export const commentIntValue = 1
export const followIntValue = 2
export const commentMentionIntValue = 3
export const postMentionIntValue = 4