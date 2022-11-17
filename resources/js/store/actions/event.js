import { createAsyncThunk, createSlice } from '@reduxjs/toolkit'

const createEvents = createAsyncThunk(
    'events/addEvents',
    async (data) => {
      try {
        const response = await axios.post('events/store', data)
        console.log(response);
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

  export {createEvents, fetchEvents}