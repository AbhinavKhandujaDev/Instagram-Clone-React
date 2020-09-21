import React from 'react'
import './Avatar.css'

function Avatar(props) {
    let { imageUrl, alt, borderColor, borderWidth, padding, altTextColor } = props
    let style = {
        border: `${borderWidth || 2}px solid ${borderColor || "#E53935"}`,
        padding: `${padding || 2}px`,
        color: `${altTextColor || "white"}`
    }
    let altname = alt !== undefined ? alt.split("")[0].toUpperCase() : "U"
    return (
        <div className="Avatar" style={style}>
            {
                imageUrl !== undefined ? <img src={imageUrl} alt={altname} srcSet="" /> 
                : <div className="alt-div">{altname}</div>
            }
        </div>
    )
}


export default React.memo(Avatar)
