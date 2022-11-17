import { createReducer } from "@reduxjs/toolkit";
import { fetchEvents } from "../actions/event";

const initialState = { 
    loading: false,
    data: [] 
}

const eventReducer = createReducer(initialState, (builder) => {
  builder
    .addCase(fetchEvents.pending, (state, action) => {
        state.loading = true
    })
    .addCase(fetchEvents.fulfilled, (state, {payload}) => {
        state.loading = false
        state.data = payload.data
    })
    .addCase(fetchEvents.rejected, (state, action) => {
        state.loading = false
    })
})

export default eventReducer