import React, { useState, useEffect } from 'react'
import './AddChatView.css'
import { cross } from '../../../../common-files/image-urls'
import { usersRef } from '../../../../FirebaseFiles/firebase.js'
import { UserListItem } from '../InboxViewComponents'
import User from '../../../../Models/UserModel.js'

function AddChatView(props) {
    let { userTapped = (() => { }), closeTapped = (() => { }) } = props

    let [userList, setUserList] = useState([])

    useEffect(() => {
        let crossImg = document.getElementById('cross')
        crossImg.addEventListener('click', () => {
            closeTapped()
        })

        let users = []
        usersRef.once('value', ss => {
            let userKeys = Object.keys(ss.val())
            userKeys.forEach(key => {
                users.push(new User(key, ss.val()[key]))
                if (users.length === userKeys.length) {
                    setUserList(users);
                }
            })
        })
    }, [])
    
    return (
        <div className="AddChatView flex-center">
            <div className="header bottom-border flex-center">
                <img id="cross" src={cross} alt="" />
                <label>New Message</label>
                <div className="next-div">Next</div>
            </div>
            <div className="user-list flex-center">
                {userList.map(user =>
                    <UserListItem
                        key={user.uid}
                        user={user}
                        isSelected={false}
                    />
                )}
            </div>
        </div>
    )
}

export default React.memo(AddChatView)
