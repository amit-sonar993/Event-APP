import React, { useEffect, useState } from 'react';
import { useForm, Controller } from "react-hook-form";
import DateTimePicker from 'react-datetime-picker';
import { useDispatch } from 'react-redux';
import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from "yup";

const schema = yup.object({
  title: yup.string().required(),
  description: yup.string().required(),
  start_date: yup.string().nullable().required(),
  end_date: yup.string().nullable().required(),
}).required();

const EventForm = ({onSubmit, data}) => {
  const { register, handleSubmit, control, formState:{ errors }, setFocus } = useForm({
    resolver: yupResolver(schema),
    defaultValues: data
  });


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
                  className="form-control"
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
                  className="form-control"
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

export default EventForm