import {GET_UNITS,SAVE_UNITS} from './units-actions'

const unitsReducer = (state: any,action: { type: any; }) => {
  
    switch (action.type) {
        case GET_UNITS: 
         return{}

        case SAVE_UNITS: 
         return{}
         
        default:
         return state 

    }

}

export default unitsReducer