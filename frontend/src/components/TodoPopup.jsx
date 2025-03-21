import React, { use, useEffect, useRef, useState } from "react";
import { useFormik } from "formik";
import * as Yup from "yup";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { createTodo, editTodo,getUsers } from "../service/api";
import useClickOutside from "../commonHooks/useClickOutside";

const TodoPopup = ({ isOpen, onClose, title, editTodoData }) => {
  const [isPriority, setIsPriority] = useState(false);
  const dropdownRef = useRef(null);

  const PriorityData = [
    { id: 1, name: "Low" },
    { id: 2, name: "Medium" },
    { id: 3, name: "High" },
  ];

  const validationSchema = Yup.object({
    text: Yup.string().required("Required"),
    priority: Yup.string().required("Required"),
  });

const userId = localStorage.getItem('id')

  const currentDate = new Date();
  const formattedDate = `${currentDate.getDate()}/${currentDate.getMonth() + 1}/${currentDate.getFullYear()}`;
  const { data: userData } = useQuery({ 
    queryKey: ['users'], 
    queryFn: getUsers, 
    staleTime: 1000 
  });
  const privateUser = userData?.find((user) => user._id === userId);
  const formik = useFormik({
    initialValues: {
      text: "",
      priority: "",
      status: false,
      user: privateUser
    },
    validationSchema,
    enableReinitialize: true,
    onSubmit: (values) => {
      const data = { ...values, deadline: formattedDate };
      handleSubmit(data);
    },
  });

  useEffect(() => {
    if (title === "Edit" && editTodoData) {
      formik.setValues(editTodoData);
    } else {
      formik.resetForm();
    }
  }, [editTodoData, title]);

  const queryClient = useQueryClient();

  const { mutate } = useMutation({
    mutationFn: createTodo,
    onSuccess: () => {
      queryClient.invalidateQueries(["todos"]);
      onClose();
      formik.resetForm();
    },
  });

  const { mutate: editMutate } = useMutation({
    mutationFn: editTodo,
    onSuccess: () => {
      queryClient.invalidateQueries(["todos"]);
      onClose();
    },
  });

  const handleSubmit = async (values) => {
    if (title === "Add") {
      mutate(values);
    } else if (title === "Edit") {
      editMutate({ id: editTodoData?._id, updatedFields: values });
    }
  };


  useClickOutside(dropdownRef, () => setIsPriority(false), isPriority);
  if (!isOpen) return null;
  
  return (
    <div className="fixed top-0 left-0 w-full h-full flex justify-center items-center bg-[#4da3d2]/75 z-10">
      <div className="shadow-lg bg-[#6fb3d8] p-10 rounded-4xl w-[30%] flex flex-col gap-y-8">
        <h2 className="text-[30px] font-bold text-white text-center ">{title} Task</h2>
        <div className="flex flex-col gap-y-4">
          <div>
            <input
              type="text"
              placeholder="Enter task name"
              autoComplete="off"
              className="w-full rounded-[8px] h-11 px-4 bg-white outline-none text-[#3485bd] placeholder:font-semibold"
              name="text"
              value={formik.values.text}
              onChange={formik.handleChange}
            />
            {formik.errors.text && <span className="text-sm text-white px-1">{formik.errors.text}</span>}
          </div>
          <div ref={dropdownRef} className="relative">
            <input
              type="text"
              onClick={() => setIsPriority(!isPriority)}
              readOnly
              placeholder="Enter priority level"
              autoComplete="off"
              className="w-full cursor-pointer rounded-[8px] h-11 px-4 bg-white outline-none text-[#3485bd] placeholder:font-semibold"
              name="priority"
              value={formik.values.priority}
            />
            {formik.errors.priority && <span className="text-sm text-white px-1">{formik.errors.priority}</span>}
            {isPriority && (
              <ul className="absolute top-12 left-0 w-full overflow-hidden bg-white rounded-[8px] text-[#3485bd] shadow-lg">
                {PriorityData.map((data) => (
                  <li
                    key={data.id}
                    onClick={() => {
                      formik.setFieldValue("priority", data.name);
                      setIsPriority(false);
                    }}
                    className="p-2 cursor-pointer hover:bg-[#3485bd]/50"
                  >
                    {data.name}
                  </li>
                ))}
              </ul>
            )}
          </div>
        </div>
        <div className="flex items-center justify-center gap-4">
          <button
            onClick={onClose}
            className="py-2 w-[40%] cursor-pointer rounded-[25px] text-white bg-[#3485bd] font-semibold"
          >
            Close
          </button>
          <button
            type="submit"
            onClick={formik.handleSubmit}
            className="py-2 w-[40%] cursor-pointer rounded-[25px] text-white bg-[#3485bd] font-semibold"
          >
            Submit
          </button>
        </div>
      </div>
    </div>
  );
};

export default TodoPopup;
