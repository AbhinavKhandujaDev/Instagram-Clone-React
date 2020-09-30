import React, { useState, useEffect } from 'react';

function CustomButton(props) {
    const { imageSelected, imageUnselected, selected, onTap, id } = props;

    const [isSelected, setSelected] = useState(selected);
    useEffect(() => {
        setSelected(selected)
    }, [selected])

    return (
        <img className="CustomButton"
            src={selected ? imageSelected : imageUnselected}
            id = {id}
            onClick={() => {
                setSelected(prevState => !prevState);
                if (onTap !== undefined) {
                    onTap(isSelected);
                }
            }}
        />
    )
}

export default React.memo(CustomButton);