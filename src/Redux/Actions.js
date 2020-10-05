import name from './ActionNames'

export const addImage = (key = null,val = null) => {
    return {
        type: name.image,
        key: key,
        value: val
    }
};

export const showPopup = (val) => {
    return {
        type: name.popup,
        value: val
    }
};
