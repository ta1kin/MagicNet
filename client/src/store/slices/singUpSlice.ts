import { createSlice, createAsyncThunk } from '@reduxjs/toolkit'
import { RouterPathes } from '@/config/config.router'

import type{ RegisterData } from '@/types/types.auth'
import type { SingUpState } from '@/types/redux/interfaces/singUp'


type SingUpState = typeof SingUpState
type RegisterData = typeof RegisterData

const initialState: SingUpState = {
    step: 0,
    maxStep: 3,
    isClicked: false,
    isLoading: false,
}


export const registerAsync = createAsyncThunk(
    `${RouterPathes.Register}/register`,
    async ( data: RegisterData, _thunkAPI ) => {
        console.log('Регистрация в системе')
        console.log( data )

        return new Promise<void>((resolve) => {
            console.log('Начало задержки')
            
            setTimeout(() => {
                console.log('Задержка завершена')
                resolve();
            }, 1000);

            return { message: 'success' }
        })
    }
)

const singUpSlice = createSlice({
    name: 'singUp',
    initialState,
    reducers: {
        nextStep: state => {
            if ( state.step < state.maxStep ) {
                state.step = state.step + 1
                state.isClicked = false
            }
        },
        prevStep: state => {
            if (state.step > 0) {
                state.step--
            }
        },
        onIsClicked: state => {
            state.isClicked = true 
         },
    },
    extraReducers: (builder) => {
        builder.addCase(registerAsync.pending, (state) => {
            state.isLoading = true
        })
        builder.addCase(registerAsync.fulfilled, (state, _action) => {
            state.isLoading = false
            state.isClicked = false
        })
        builder.addCase(registerAsync.rejected, (state) => {
            state.isLoading = false
        })
    }
})

export const { nextStep, prevStep, onIsClicked } = singUpSlice.actions
export default singUpSlice.reducer