import React, { useEffect } from 'react'
import ReactDOM from 'react-dom'
import './Modal.css'
import { zoom } from '../../common-files/animations.js'

function Modal(props) {
    let { view = null, backgroundTapped = (() => { }), width = '300px', height = '300px' } = props

    let modalStyle = {
        width: '100vw',
        height: '100vh',
    }

    useEffect(() => {
        console.log('Modal called')
        let addedView = document.getElementById('Modal').childNodes[0]
        addedView.style.width = width
        addedView.style.height = height
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
