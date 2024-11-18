import { createSlice } from '@reduxjs/toolkit'

import type { ErrorState } from '@/types/redux/interfaces/error'
type ErrorState = typeof ErrorState

const initialState: ErrorState = {
    text: ''
}

const errorSlice = createSlice({
    name: 'error',
    initialState,
    reducers: {
        resetError: state => {
            state.text = ''
        }
    }
})

export const { resetError } = errorSlice.actions
export default errorSlice.reducer