import { createReducer } from "@reduxjs/toolkit";
import { fetchEvents } from "../actions/event";

const initialState = { 
    loading: false,
    data: [],
    paginationMeta: {

    }
}

const eventReducer = createReducer(initialState, (builder) => {
  builder
    .addCase(fetchEvents.pending, (state, action) => {
        state.loading = true
    })
    .addCase(fetchEvents.fulfilled, (state, {payload}) => {
        state.loading = false
        state.data = payload.data?.data

        let {current_page = 1, total = 0, per_page=10, from = 0, last_page = 0 } = payload.data
        state.paginationMeta = {
            current_page,
            total,
            per_page,
            from,
            last_page
        }
    })
    .addCase(fetchEvents.rejected, (state, action) => {
        state.loading = false
    })
})

export default eventReducer