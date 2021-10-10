import React from 'react'
import ScheduleContext from './schedule-context'
import scheduleReducer from './schedule-reducer'
import {CREATE_SCHEDULE,REMOVE_ONE_SCHEDULE,CLEAR_SCHEDULE} from './schedule-actions'

export default function ScheduleState(props: { children: boolean | React.ReactChild | React.ReactFragment | React.ReactPortal | null | undefined }) {
    
    const scheduleInitialState = {

    schedule: []

    }
    const [scheduleState,scheduleDispatch] = React.useReducer(scheduleReducer,scheduleInitialState)

    // create schedule  
    const createSchedule = (schedule: []) => {
        scheduleDispatch({
            type: CLEAR_SCHEDULE,
        })
    }

    // remove one schedule  
    const removeOneSchedule = (schedule: []) => {
        scheduleDispatch({
            type: REMOVE_ONE_SCHEDULE,
        })
    }

    // clear schedule  
    const clearSchedule = (schedule: []) => {
        scheduleDispatch({
            type: CLEAR_SCHEDULE,
        })
    }
    
    
    const [schedule, setSchedule] = React.useState([])

    return (
        <ScheduleContext.Provider value={{
            scheduleState,
            createSchedule,
            removeOneSchedule,
            clearSchedule
        }}>
            {props.children}
        </ScheduleContext.Provider>
    )
}


