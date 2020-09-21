import React from 'react';
import './DefButton.css';

function DefButton(props) {
    const { text, type, showLoader, onPress, isActive } = props;
    let textcolor = showLoader ? 'transparent' : 'white';
    let bgColor = isActive ? 'var(--def-blue-active)' : 'var(--def-blue-inactive)'
    return (
        <div className="DefButton flex-center">
            <button style={{backgroundColor:bgColor, color:textcolor}} onClick={onPress} type={type}>{text}</button>
            {showLoader ? <Loader/> : null}
        </div>
    );
}

function Loader() {
    return (
        <div className="loader flex-center">
            <img src={require('../../images/loader.png')} alt="" srcSet="" />
        </div>
    );
}

export default React.memo(DefButton);