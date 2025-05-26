import { createSlice } from '@reduxjs/toolkit'

const draftspace = createSlice({
    name: 'draftspace',
    initialState: {
        data: {}
    },
    reducers: {
        storeData: () => { }
    }
})

export const {
    storeData
} = draftspace.actions

export default draftspace.reducer