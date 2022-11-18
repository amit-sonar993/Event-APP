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
    async ({page, selectedFilterOption}) => {
      try {
        const response = await axios.get('/events', {
          params: {
            page: page,
            filter: selectedFilterOption.value
          }
        })
        return response.data
      } catch (error) {
        return error && error.response?.data
      }
    }
  )


  const updateEvents = createAsyncThunk(
    'events/update',
    async (data) => {
      try {
        const response = await axios.put(`/events/${data.id}/update`, data)
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

  export {createEvents, fetchEvents, deleteEvents, updateEvents}