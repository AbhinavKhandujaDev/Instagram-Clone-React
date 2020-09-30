import React, { useState } from 'react'
import { edit } from '../../../common-files/image-urls'
import Avatar from '../../Avatar/Avatar';
import { staticImage } from '../../../common-files/image-urls'
import './Inbox.css'

function Inbox() {
    let [state, setState] = useState({
        message: ""
    })
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

                <div className="right-container">

                    <div className="user-chats">
                        {Array.apply(null, Array(25)).map((e, i) =>
                            <ChatBubble text="hi" isSent={i%2 === 0} />
                        )}
                    </div>
                    <InputView value={state.message} onChange={text => {
                        setState({...state, message: text})
                    }}/>
                </div>
            </div>
        </div>
    )
}

let ChatBubble = React.memo((props) => {
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
        margin: "10px 0"
    }

    return (
        <div className="ChatBubble">
            <div style={bubbleBg}>
                <label style={{ display: 'block', padding: '3px' }}> {text} </label>
            </div>
        </div>
    )
})

let InputView = React.memo((props) => {
    let {value = "", onChange} = props;

    let style = {
        padding: '5px 12px',
        display: 'flex',
        borderRadius: '25px',
        overflow: 'hidden'
    }

    let inputStyle = {
        padding: '10px',
        flex: 1,
        border: 'none'
    }

    let buttonStyle = {
        fontWeight: 'bold',
        fontSize: '14px',
        flex: 0,
        margin: '0 5px',
        cursor: 'pointer',
        color: value !== "" ? '#458eff' : '#94BFFF'
    }

    return (
        <div style={style} className="InputView default-border-box">
            <input
                style={inputStyle}
                type="text"
                placeholder="Message..."
                value={value}
                onChange={e => onChange(e.target.value)}
            />
            <div style={buttonStyle}>Send</div>
        </div>
    )
})

export default React.memo(Inbox)
