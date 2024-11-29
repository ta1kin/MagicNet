import { createSlice } from '@reduxjs/toolkit'

import type { SettingsState } from '@/types/redux/interfaces/setting'
type SettingsState = typeof SettingsState

const initialState: SettingsState = {
    theme: 'light',
    lng: 'ru'
}

const settingsSlice = createSlice({
    name: 'settings',
    initialState,
    reducers: {
        toggleTheme: state => {
            state.theme =  state.theme === 'light' ? 'dark' : 'light'
        },
        setLng: (state, action) => {
            state.lng = action.payload
        },
        setTheme: (state, action) => {
            state.theme = action.payload
        }
    }
})

export const { toggleTheme, setLng, setTheme } = settingsSlice.actions
export default settingsSlice.reducer