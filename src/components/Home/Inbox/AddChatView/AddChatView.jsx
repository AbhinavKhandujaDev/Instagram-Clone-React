import React, { useState, useEffect, useRef } from 'react'
import ReactDOM from 'react-dom'
import './AddChatView.css'
import '../../../../common-files/styles.css'
import { cross } from '../../../../common-files/image-urls'
import { usersRef } from '../../../../FirebaseFiles/firebase.js'
import { UserListItem } from '../InboxViewComponents'
import User from '../../../../Models/UserModel.js'
import { zoom } from '../../../../common-files/animations.js'

function AddChatView(props) {
    let { userTapped = (() => { }), closeTapped = (() => { }) } = props

    let [userList, setUserList] = useState([])

    let selfview = useRef(null)
    let childView = useRef(null)

    useEffect(() => {
        let users = []

        usersRef.once('value', ss => {
            let userKeys = Object.keys(ss.val())
            userKeys.forEach(key => {
                users.push(new User(key, ss.val()[key]))
                if (users.length === userKeys.length) { setUserList(users) }
            })
        })

        selfview.current.onClick = () => closeTapped()
        zoom(childView.current);

        return () => usersRef.off()
    }, [props])

    return ReactDOM.createPortal(
        <div ref={selfview} id="id-AddChatView" className="AddChatView back-shadow flex-center">
            <div ref={childView} className="container flex-center">
                <div className="header bottom-border flex-center">
                    <img id="cross" src={cross} alt="" onClick={() => closeTapped()} />
                    <label>New Message</label>
                    <div className="next-div" />
                </div>
                <div className="user-list flex-center">
                    {userList.map(user =>
                        <UserListItem
                            key={user.uid}
                            user={user}
                            isSelected={false}
                            onTap={() => {
                                userTapped(user)
                            }}
                        />
                    )}
                </div>
            </div>
        </div>,
        document.getElementById('portal')
    )
}

export default React.memo(AddChatView)
