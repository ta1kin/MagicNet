import { createSlice, createAsyncThunk } from '@reduxjs/toolkit'
import { RouterPathes } from '@/config/config.router'

import axios from 'axios'

import type { HomeState, SettingsPutData } from '@/types/redux/interfaces/home'

type HomeState = typeof HomeState
type SettingsPutData = typeof SettingsPutData


const SERVER_URL = import.meta.env.VITE_SERVER_URL
const VITE_DELETE = import.meta.env.VITE_DELETE
const VITE_UPDATE_INFO = import.meta.env.VITE_UPDATE_INFO

const initialState: HomeState = {
    variant: 0,
    personalInfo: {
        nickname: '',
        name: '',
        phone: '',
    },
    delErr: false,
    isReset: false
}

export const updatePersonalInfo = createAsyncThunk(
    `${RouterPathes.Home}/update`,
    async ( data: SettingsPutData, _thunkAPI ) => {
        if( !SERVER_URL || !VITE_UPDATE_INFO ) throw new Error( 'Не заданы пути для изменения данных!' )

        const accessToken = data.accessToken

        delete data.accessToken
        
        const response = await axios.put(
            `${SERVER_URL}/${VITE_UPDATE_INFO}`,
            {
                data: data
            },
            {
                headers: {
                    'Authorization': `Bearer ${ accessToken }`
                }
            }
        )

        if( response.status !== 200 ) throw new Error( 'Ошибка при изменении данных!' )
        
        return data
    }
)

export const deleteAsync = createAsyncThunk(
    `${RouterPathes.Home}/delete`,
    async ( accessToken, _thunkAPI ) => {
        if( !SERVER_URL || !VITE_DELETE ) throw new Error( 'Не заданы пути для удаления!' )
        
        console.log( accessToken )

        const response = await axios.delete(
            `${SERVER_URL}/${VITE_DELETE}`,
            {
                headers: {
                    Authorization: `Bearer ${accessToken}`
                }
            }
        )

        if( response.status !== 200 ) throw new Error( 'Ошибка при удалении!' )
    }
)


const homeSlice = createSlice({
    name: 'home',
    initialState,
    reducers: {
        setVariant: (state, action) => {
            state.variant = action.payload
        },
        setPersonalInfo: (state, action) => {
            state.personalInfo = action.payload
        },
        toggleReset: state => {
            state.isReset = !state.isReset
        }
    },
    extraReducers: (builder) => {
        builder.addCase(updatePersonalInfo.pending, (state) => {
            state.delErr = false
        })
        builder.addCase(updatePersonalInfo.fulfilled, (state, action) => {
            state.delErr = false
            state.personalInfo = { ...state.personalInfo, ...action.payload }
            console.log( state.personalInfo )
        })
        builder.addCase(updatePersonalInfo.rejected, (state) => {
            state.delErr = true
        })

        builder.addCase(deleteAsync.pending, (state) => {
            state.delErr = false
        })
        builder.addCase(deleteAsync.fulfilled, (state, _action) => {
            state.delErr = false
        })
        builder.addCase(deleteAsync.rejected, (state) => {
            state.delErr = true
        })
    }
})

export const { setVariant, setPersonalInfo, toggleReset } = homeSlice.actions
export default homeSlice.reducer
