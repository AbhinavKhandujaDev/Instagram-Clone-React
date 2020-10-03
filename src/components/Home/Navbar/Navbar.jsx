import React, { useState, useEffect } from 'react';
import './Navbar.css'
import * as images from '../../../common-files/image-urls';
import DefaultTextField from '../../DefaultTextField/DefaultTextField'
import Avatar from '../../Avatar/Avatar';
import { fetchUser } from '../../../FirebaseFiles/FirebaseFunctions';
import { currentUserId, getPathName } from '../../../FirebaseFiles/firebase.js'
import { Link } from "react-router-dom";
import CustomButton from "../../CustomButton";

let logo = images.logo;



function Navbar() {
    let path = getPathName()
    let useStates = {
        owner: {},
        homeSelected: path == 'home',
        msgSelected: path == 'inbox',
        heartSelected: false
    }

    const [states, setState] = useState(useStates);

    useEffect(() => {
        fetchUser(currentUserId, (user) => {
            localStorage.setItem('username', user.username);
            setState(prevState => ({ ...prevState, owner: user }));
        })
    }, []);

    function buttonsTapped(homeSelected = false, msgSelected = false, heartSelected = false) {
        setState(prevState => ({
            ...prevState,
            homeSelected: homeSelected,
            msgSelected: msgSelected,
            heartSelected: heartSelected
        }))
    }

    return (
        <nav className="Navbar flex-center bottom-border">
            <div className="content-view flex-center">
                <img className="logo" src={logo} alt="" srcSet="" />
                <DefaultTextField placeholder="Search" value="" />
                <div className="nav-buttons-div">
                    <Link to="/">
                        <CustomButton
                            imageSelected={images.homeSelected}
                            imageUnselected={images.homeUnselected}
                            selected={states.homeSelected}
                            onTap={() => buttonsTapped(true)}
                        />
                    </Link>

                    <Link to="/inbox">
                        <CustomButton
                            imageSelected={images.msgSel}
                            imageUnselected={images.msgUnsel}
                            selected={states.msgSelected}
                            onTap={() => buttonsTapped(false, true)}
                        />
                    </Link>

                    <CustomButton
                        imageSelected={images.heartSelectedBlack}
                        imageUnselected={images.heartUnselected}
                        selected={states.heartSelected}
                        isToggle={true}
                        onTap={() => buttonsTapped(false, false, !states.heartSelected)}
                    />

                    <Link to={`/${localStorage.getItem('username')}`}
                        onClick={() => buttonsTapped(false, false, false)}>
                        
                        <Avatar
                            borderColor='transparent'
                            imageUrl={states.owner.profileImageUrl}
                            alt={states.owner.name}
                        />

                    </Link>
                </div>
            </div>
        </nav>
    )
}

export default React.memo(Navbar);