import { createSlice } from '@reduxjs/toolkit'

const initialState = {
    objectId: 10245,
    apiData: {},

}

const dataSlice = createSlice({
    name: 'data',
    initialState,
    reducers: {
        setData: (state, action) => {
            return {...state, apiData : action.payload}
        },
        increment: (state) => {
            return { ...state, objectId: state.objectId + 1  }
        },
        decrement: (state) => {
            return { ...state, objectId: state.objectId - 1  }
        },
        customId: (state, action) => {
            return{ ...state, objectId: action.payload}
        },
        resetData: (state) =>{
            return{initialState}
        }
    }
})

export const { setData, increment, decrement, customId, resetData } = dataSlice.actions

export const fetchData = () => {
    const dataThunk = async(dispatch, getState) =>{
        let state = getState()
        const response = await fetch(`https://collectionapi.metmuseum.org/public/collection/v1/objects/${state.data.objectId}`)
        const rData = await response.json()
        dispatch(setData(rData))
    }
    return dataThunk
}

export default dataSlice.reducer