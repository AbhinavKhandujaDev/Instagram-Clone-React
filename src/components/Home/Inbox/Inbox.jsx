import React, { useState } from 'react'
import { edit } from '../../../common-files/image-urls'
import Avatar from '../../Avatar/Avatar';
import { staticImage } from '../../../common-files/image-urls'
import './Inbox.css'

function Inbox() {
    let [state] = useState("")
    return (
        <div className="Inbox flex-center default-border-box">
            <div className="left-box right-border">
                <div className="header bottom-border flex-center">
                    <label>Direct</label>
                    <img className="edit-image" src={edit} alt="" />
                </div>
                <div className="user-list">
                    {Array.apply(null, Array(5)).map((e, i) =>
                        <div key={i} className="user-chat-list">
                            <Avatar imageUrl={staticImage} borderColor="transparent" />
                            <div className="user-chat-detail">
                                <label>Username</label>
                                <label className="last-chat-time">2h ago</label>
                            </div>
                        </div>
                    )}
                </div>
            </div>
            <div className="right-box">
                <div className="header bottom-border chats-box flex-center">
                    <label>Username</label>
                </div>

                <div className="user-chats">
                    <ChatBubble text="hi" isSent={true} />
                    <ChatBubble text="hi" />
                </div>
            </div>
        </div>
    )
}

function ChatBubble(props) {
    let { text = "", isSent = false } = props

    let bgColor = isSent ? '#458eff' : '#EEEEEE';

    let bubbleBg = {
        backgroundColor: bgColor,
        float: isSent ? 'right' : 'left',
        color: isSent ? 'white' : '#212121',
        padding: '12px 15px',
        borderRadius: '50px',
        maxWidth: '80%',
        wordWrap: "break-word",
        margin: '10px'
    }

    return (
        <div className="ChatBubble">
            <div style={bubbleBg}>
                <label style={{ display: 'block', padding: '3px' }}> {text} </label>
            </div>
        </div>
    )
}

export default Inbox
