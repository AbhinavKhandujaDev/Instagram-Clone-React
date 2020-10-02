import React, { useState, useEffect, useCallback, useMemo } from 'react'
import { edit } from '../../../common-files/image-urls'
import { currentUserId, userMessagesRef, messagesRef } from '../../../FirebaseFiles/firebase.js'
import { fetchUser } from '../../../FirebaseFiles/FirebaseFunctions'
import './Inbox.css'
import Message from '../../../Models/Message.js'
import User from '../../../Models/UserModel.js'
import { UserListItem, ChatBubble, InputView, NoChatView, ChatList } from './InboxViewComponents'
import Modal from '../../Modal/Modal'

function Inbox() {
    let [state, setState] = useState({
        message: "",
        userSelected: {},
        usersChatted: [],
        userChats: [],
        showPopup: false
    })

    function getChats(selUser) {
        let chats = []

        // fetch user messages id
        userMessagesRef.child(currentUserId).child(selUser.uid).on('child_added', (msgesSs) => {

            // fetch message data
            messagesRef.child(msgesSs.key).once('value', (dataSs) => {
                let data = dataSs.val();
                let msg = new Message(msgesSs.key, data)
                chats.push(msg)
                setState(prevState => ({ ...prevState, userSelected: selUser, userChats: chats }))
                var objDiv = document.getElementsByClassName('ChatList')[0];
                if (objDiv !== null) {
                    objDiv.scrollTop = objDiv.scrollHeight;
                }
            })
        })
    }

    function sendMessage(msg) {
        let selUserId = state.userSelected.uid
        let creationDate = new Date().getTime()
        let values = {
            creationDate: creationDate,
            fromId: currentUserId,
            toId: selUserId,
            messageText: msg
        }
        let key = messagesRef.push().key
        let obj = { [key]: 1 }
        messagesRef.child(key).update(values, () => {
            userMessagesRef.child(currentUserId).child(selUserId).update(obj)
            userMessagesRef.child(selUserId).child(currentUserId).update(obj)
        })
    }

    useEffect(() => {
        let uChatted = []

        // fetch messaged users
        userMessagesRef.child(currentUserId).on('child_added', (userSs) => {
            let key = userSs.key
            fetchUser(key, userData => {
                let user = new User(key, userData);
                uChatted.push(user);
                setState(prevState => ({ ...prevState, usersChatted: uChatted }))
            })
        })
    }, [])

    return (
        <div className="Inbox flex-center default-border-box">
            <div className="left-box right-border">
                <div className="header bottom-border flex-center">
                    <label>Direct</label>
                    <img onClick={(() => setState({ ...state, showPopup: true }))} className="edit-image" src={edit} alt="" />
                </div>
                <div className="user-list">
                    {state.usersChatted.map(e =>
                        <UserListItem
                            key={e.uid}
                            isSelected={e.uid === state.userSelected.uid}
                            user={e}
                            time="----"
                            onTap={() => getChats(e)}
                        />
                    )}
                </div>
            </div>

            <div className="right-box">
                {JSON.stringify(state.userSelected) === JSON.stringify({}) ? <NoChatView />
                    : <>
                        <div className="header bottom-border flex-center">
                            <label>{state.userSelected.username}</label>
                        </div>

                        <div className="right-container">
                            <ChatList
                                chats={state.userChats}
                                currentUserId={currentUserId}
                            />

                            <InputView
                                value={state.message}
                                onChange={text => setState({ ...state, message: text })}
                                sendTapped={(msg) => {
                                    sendMessage(msg)
                                    setState({ ...state, message: "" })
                                }}
                            />
                        </div>
                    </>}
            </div>
            {state.showPopup ? <Modal
                backgroundTapped={() => setState({ ...state, showPopup: false })}
                view={() => {
                    return <NoChatView />
                }} /> : null}
        </div>
    )
}

export default React.memo(Inbox)
