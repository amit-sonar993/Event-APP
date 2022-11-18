import React, { useEffect, useState } from 'react';
import { useForm, Controller } from "react-hook-form";
import DateTimePicker from 'react-datetime-picker';
import { useDispatch } from 'react-redux';
import { createEvents } from '../../store/actions/event';
import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from "yup";
import { format } from 'date-fns'
import { toast } from 'react-toastify';

const schema = yup.object({
  title: yup.string().required(),
  description: yup.string().required(),
  start_date: yup.string().nullable().required(),
  end_date: yup.string().nullable().required(),
}).required();

const AddEventForm = ({setSubmittng, handleClose}) => {
  const { register, handleSubmit, control, formState:{ errors }, setFocus } = useForm({
    resolver: yupResolver(schema)
  });
  const dispatch = useDispatch();
  const onSubmit = async (data) => {
    let startDate = format(new Date(data['start_date']), 'yyyy-MM-dd')
    let endDate = format(new Date(data['end_date']), 'yyyy-MM-dd')
    data['start_date'] = startDate
    data['end_date'] = endDate

    setSubmittng(true)
    let {payload} = await dispatch(createEvents(data))

    if (payload && payload.status) {
      setSubmittng(false)
      
      if (payload.status == 'success') {
        handleClose()
        toast.success('Events added successfully!', {
            position: "top-right",
            autoClose: 5000,
            hideProgressBar: false,
            closeOnClick: true,
            pauseOnHover: true,
            draggable: true,
            progress: undefined,
            theme: "light",
        });
      }
      
      
    }    
  };


  return (
    <div>
      <form id="event-form" onSubmit={handleSubmit(onSubmit)}>
        <div className="mb-3">
          <label htmlFor="title" className="form-label">Title</label>
          <input type="text" className="form-control" {...register("title")} id="title" />
          <div className="invalid-feedback d-block">{errors.title?.message}</div>
        </div>
        <div className="mb-3">
          <label htmlFor="description" className="form-label">Description</label>
          <textarea  className="form-control" id="description" {...register("description")} />
          <div className="invalid-feedback d-block">{errors.description?.message}</div>
        </div>
        <div className="mb-3">
          <label htmlFor="start" className="form-label">start date</label>
          <Controller
            name="start_date"
            control={control}
            render={({ field: { ref, ...field } }) => {
              return (
                <DateTimePicker
                  value={field.value}
                  onChange={field.onChange}
                  innerRef={ref}
                  format="y-MM-dd"
                />
              );
            }}
          />
          <div className="invalid-feedback d-block">{errors.start_date?.message}</div>
        </div>
        <div className="mb-3">
          <label htmlFor="end_date" className="form-label">start date</label>
          <Controller
            name="end_date"
            control={control}
            render={({ field: { ref, ...field } }) => {
              return (
                <DateTimePicker
                  value={field.value}
                  onChange={field.onChange}
                  innerRef={ref}
                  format="y-MM-dd"
                />
              );
            }}
          />
          <div className="invalid-feedback d-block">{errors.end_date?.message}</div>
        </div>
      </form>
    </div>
  )
}

export default AddEventForm