import React from 'react';
import './DefaultTextField.css'

function DefaultTextField(props) {
    const { type, placeholder, id, value, onChange, error } = props;

    let lblClass = value === "" ? 'label-inactive' : 'label-active';
    let inputClass = value === "" ? 'textfield' : 'textfield input-not-empty';

    let errorClass = error ? "errorBox" : "";
    
    let change = (e) => onChange != null ? (onChange(e.target.value)) : null;
    return (
        <div className={"DefaultTextField " + errorClass}>
            <label className={lblClass}> {placeholder} </label>
            <input
                type={type}
                className={inputClass}
                onChange={e => change(e)}
                value={value}
                id={id}
            />
        </div>
    );
}

export default React.memo(DefaultTextField);