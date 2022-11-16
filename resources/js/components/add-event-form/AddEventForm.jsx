import React from 'react'
import { useForm } from "react-hook-form";

const AddEventForm = () => {
  const { register, handleSubmit } = useForm();
  const onSubmit = data => console.log(data);

  return (
    <div>
      <form onSubmit={handleSubmit(onSubmit)}>
        <div className="mb-3">
          <label htmlFor="title" className="form-label">Title</label>
          <input type="text" className="form-control" {...register("title")} id="title" />
        </div>
        <div className="mb-3">
          <label htmlFor="description" className="form-label">Description</label>
          <textarea  className="form-control" id="description" {...register("description")} />
        </div>
        <button type="submit">submit</button>
      </form>
    </div>
  )
}

export default AddEventForm