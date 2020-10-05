import React, { useEffect } from 'react'
import { zoom } from '../../common-files/animations.js'
import './Modal.css'
import ReactDOM from 'react-dom'

function Modal(props) {
    let { view = null, backgroundTapped = (() => { }), width = null, height = null } = props

    let modalStyle = {
        width: '100vw',
        height: '100vh',
    }

useEffect(() => {
    let addedView = document.getElementById('Modal').childNodes[0]
    if (width !== null) {
        addedView.style.width = width
    }

    if (height !== null) {
        addedView.style.height = height
    }

    addedView.addEventListener('click', (e) => {
        e.stopPropagation();
    })
    zoom(addedView)
})

    return view === null ? null : ReactDOM.createPortal(
        <div className="grid-center" onClick={e => {
            backgroundTapped()
        }} style={modalStyle} id="Modal">
            {view !== null ? <>{view()}</> : null}
        </div>,
        document.getElementById("portal"))
}

export default Modal
