import { createSlice } from '@reduxjs/toolkit'

import type { BookState } from '@/types/redux/interfaces/book'

type BookState = typeof BookState


const initialState: BookState = {}

const bookSlice = createSlice({
    name: 'book',
    initialState,
    reducers: {}
})

export default bookSlice.reducer