import React from 'react'
import Avatar from '../../Avatar/Avatar';
import { msgUnsel } from '../../../common-files/image-urls'

export let UserListItem = React.memo((props) => {
    let { isSelected = false, user = {}, time = "", onTap = () => { } } = props

    let itemStyle = {
        display: "flex",
        alignItems: "center",
        padding: "10px",
        fontWeight: 500,
        cursor: "pointer",
    };

    if (isSelected) {
        itemStyle['backgroundColor'] = '#EEEEEE'
    }

    let chatDetailStyle = {
        height: "30px",
        display: "flex",
        flexDirection: "column",
        marginLeft: "8px",
        justifyContent: "center",
        cursor: "pointer"
    };

    let lastChatTimeStye = {
        fontSize: "12px",
        color: "rgb(116, 116, 116)",
        marginTop: "5px",
        cursor: "pointer"
    }

    return (
        <div onClick={ !isSelected ? onTap : null} style={itemStyle} className="UserListItem">
            <Avatar imageUrl={user.profileImageUrl} borderColor="transparent" />
            <div style={chatDetailStyle} className="user-chat-detail">
                <label style={{ cursor: 'pointer' }}>{user.username}</label>
                <label style={lastChatTimeStye} className="last-chat-time">{time}</label>
            </div>
        </div>
    )
})

export let InputView = React.memo((props) => {
    let { value = "", onChange = () => { }, sendTapped = () => { } } = props;

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
        all: 'unset',
        fontWeight: 'bold',
        fontSize: '14px',
        flex: 0,
        margin: '0 5px',
        cursor: 'pointer',
        color: value !== "" ? '#247bff' : '#94BFFF',
        decoration: 'none',
    }

    return (
        <form style={style} className="InputView default-border-box">
            <input
                style={inputStyle}
                type="text"
                placeholder="Message..."
                value={value}
                onChange={e => onChange(e.target.value)}
            />
            <button type="submit" style={buttonStyle} onClick={(e) => {
                e.preventDefault();
                if (value !== "") { sendTapped(value) }
            }}>Send</button>
        </form>
    )
})

export let NoChatView = React.memo(() => {

    let style = {
        display: "flex",
        flexDirection: "column",
        justifyContent: "center",
        alignItems: "center",
        flex: 1,
        textAlign: "center",
        backgroundColor: 'white',
        height: "100%",
        padding: '0 30px'
    }

    let imageStyle = {
        width: "90px",
        height: "90px",
    }

    return (
        <div style={style} className="no-chat-view">
            <img style={imageStyle} src={msgUnsel} alt="" />
            <label style={{ fontSize: 22, margin: 10 }}> Your Messages </label>
            <label> Send private photos and messages to a friend or group. </label>
        </div>
    )
})

export let ChatList = props => {
    let { chats, currentUserId } = props

    let style = {
        display: 'flex',
        flexDirection: 'column'
    }

    return (
        <div style={style} className="ChatList">
            {chats.map(e =>
                <ChatBubble
                    key={e.messageId}
                    text={e.messageText}
                    isSent={e.fromId === currentUserId}
                />
            )}
        </div>
    )
}

export let ChatBubble = React.memo((props) => {
    let { text = "", isSent = false } = props

    let bgColor = isSent ? '#458eff' : '#EEEEEE';

    let bubbleBg = {
        backgroundColor: bgColor,
        float: isSent ? 'right' : 'left',
        color: isSent ? 'white' : '#212121',
        // padding: '10px 30px',
        padding: '5px',
        borderRadius: '50px',
        maxWidth: '80%',
        wordWrap: "break-word",
        margin: "10px 0",
        textAlign: 'justify',
        maxWidth: '60%'
    }

    return (
        <div className="ChatBubble">
            <div style={bubbleBg}>
                <label style={{ display: 'block', padding: '10px 20px' }}> {text} </label>
            </div>
        </div>
    )
})