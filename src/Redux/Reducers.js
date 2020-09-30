import name from './ActionNames'

export const imageReducer = (state = {}, action) => {
    switch (action.type) {
        case name.image: return state[`${action.key}`] = action.value
        default: return state;
    }
};