import React from 'react'
import UnitsContext from './units-context'
import unitsReducer from './units-reducer'
import {GET_UNITS,SAVE_UNITS} from './units-actions'

export default function ScheduleState(props: { children: boolean | React.ReactChild | React.ReactFragment | React.ReactPortal | null | undefined }) {
    
    const unitsInitialState = {

    units: []

    }
    
    const [unitsState,dispatch] = React.useReducer(unitsReducer,unitsInitialState)

    // get units 
    const getUnits = (units: []) => {
        dispatch({
            type: GET_UNITS,
        })
    }

    // save units 
     const saveUnits = (units: []) => {
        dispatch({
            type: SAVE_UNITS,
        })
    }
    
    const [units, setUnits] = React.useState([
         {
        title: "Accounting",
        chapterCount: "10",
    },
    {
        title: "Management",
        chapterCount: "7",
    },
    {
        title: "Math",
        chapterCount: "12",
    },
    {
        title: "Microeconomics",
        chapterCount: "9",
    },
    ])

    return (
        <UnitsContext.Provider value={{
            unitsState,
            getUnits,
            saveUnits
        }}>
            {props.children}
        </UnitsContext.Provider>
    )
}


