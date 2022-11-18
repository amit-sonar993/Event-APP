import { createAsyncThunk, createSlice } from '@reduxjs/toolkit'

const createEvents = createAsyncThunk(
    'events/addEvents',
    async (data) => {
      try {
        const response = await axios.post('events/store', data)
        return response.data
      } catch (error) {
        return error && error.response?.data
      }
    }
  )

  const fetchEvents = createAsyncThunk(
    'events/fetchEvents',
    async (data) => {
      try {
        const response = await axios.get('/events')
        console.log(response);
        return response.data
      } catch (error) {
        return error && error.response?.data
      }
    }
  )

  const deleteEvents = createAsyncThunk(
    'events/delete',
    async (id) => {
      try {
        const response = await axios.delete(`/events/${id}/delete`)
        return response.data
      } catch (error) {
        return error && error.response?.data
      }
    }
  )

  export {createEvents, fetchEvents, deleteEvents}