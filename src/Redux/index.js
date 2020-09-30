import {imageReducer} from './Reducers.js'
import {combineReducers} from 'redux'

const allReducers = combineReducers({
    images: imageReducer
})

export default allReducers;