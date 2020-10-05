import {imageReducer, popupReducer} from './Reducers.js'
import {combineReducers} from 'redux'

const allReducers = combineReducers({
    images: imageReducer,
    popup: popupReducer
})

export default allReducers;