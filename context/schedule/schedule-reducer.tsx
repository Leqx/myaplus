import {REMOVE_ONE_SCHEDULE,CREATE_SCHEDULE,CLEAR_SCHEDULE} from './schedule-actions'

const scheduleReducer = (state: any,action: { type: any; }) => {

    switch (action.type) {
        case CREATE_SCHEDULE: 
         return{}

        case REMOVE_ONE_SCHEDULE: 
         return{}

        case CLEAR_SCHEDULE: 
         return{}
         
        default:
         return state 

    }

}

export default scheduleReducer