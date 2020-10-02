import {currentUserId} from '../FirebaseFiles/firebase.js'

export default class Message {
    constructor(msgId = "", snapshot = {}) {
        this.messageText = snapshot.messageText
        this.fromId = snapshot.fromId
        this.toId = snapshot.toId
        this.creationDate = snapshot.creationDate

        this.messageId = msgId
    }

    getDate() {
        return this.creationDate;
    }

    getChatPartnerId() {
        if (currentUserId == null) {return null;}
        return (this.fromId == currentUserId) ? this.toId : this.fromId;
    }
}
