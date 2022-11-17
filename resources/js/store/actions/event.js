import { createAsyncThunk, createSlice } from '@reduxjs/toolkit'

const createEvents = createAsyncThunk(
    'events/addEvents',
    async (data) => {
        console.log('data action', data)
      const response = await axios.post('events/store', data)
      console.log(response);
      return response.data
    }
  )

  export {createEvents}