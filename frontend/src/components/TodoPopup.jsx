import React, { useEffect, useRef, useState } from "react";
import { useFormik } from "formik";
import * as Yup from "yup";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { createTodo, editTodo, getUsers } from "../service/api";
import useClickOutside from "../commonHooks/useClickOutside";
import useAuthStore from "../store/authStore";

const TodoPopup = ({ isOpen, onClose, title, editTodoData }) => {
  const [isPriority, setIsPriority] = useState(false);
  const [isUser, setIsUser] = useState(false);
  const dropdownRef = useRef(null);
  const userdownRef = useRef(null);
  const { setUserData } = useAuthStore();

  const PriorityData = [
    { id: 1, name: "Low" },
    { id: 2, name: "Medium" },
    { id: 3, name: "High" },
  ];

  const validationSchema = Yup.object({
    text: Yup.string().required("Task is Required"),
    priority: Yup.string().required("Priority is Required"),
    user: Yup.object().shape({
      _id: Yup.string().required("User ID is Required"),
      username: Yup.string().required("Username is Required"),
      password: Yup.string().required("Password is Required"),
      role: Yup.string().required("Role is Required"),
      __v: Yup.number(),
    }).required("User is Required"),
  });
  
  const userId = localStorage.getItem("id");

  const currentDate = new Date();
  const formattedDate = `${currentDate.getDate()}/${currentDate.getMonth() + 1}/${currentDate.getFullYear()}`;

  const { data: userData } = useQuery({
    queryKey: ["users"],
    queryFn: getUsers,
    staleTime: 1000,
  });

  // const privateUser = ;
  
  useEffect(() => {
    if (userData) {
      setUserData(userData?.find((user) => user._id === userId));
    }
  }, [userData]);

  const formik = useFormik({
    initialValues: {
      text: "",
      priority: "",
      status: false,
      user: {},
    },
    validationSchema,
    enableReinitialize: true,
    onSubmit: (values) => {
      if(values){
        // let userDetail = userData?.find((user) => user._id === values.user);
        const data = { ...values, deadline: formattedDate };
        handleSubmit(data);
        console.log(data,"88");
      }
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
  useClickOutside(userdownRef, () => setIsUser(false), isUser);

  if (!isOpen) return null;

  return (
    <div className="fixed top-0 left-0 w-full h-full flex justify-center items-center bg-[#000000]/75 z-10 text-gray-400">
      <div className="shadow-lg bg-[#fff] p-10 rounded-4xl w-[30%] flex flex-col gap-y-8">
        <h2 className="text-[30px] font-bold text-center">{title} Task</h2>
        <div className="flex flex-col gap-y-4">
          <div>
            <input
              type="text"
              placeholder="Enter task name"
              autoComplete="off"
              className="w-full rounded-[8px] h-11 px-4 bg-[#f5f5f5] outline-none capitalize tracking-[1px] placeholder:tracking-[0px]"
              name="text"
              value={formik.values.text}
              onChange={formik.handleChange}
            />
            {formik.errors.text && <span className="text-sm text-red-400/90 px-1">{formik.errors.text}</span>}
          </div>
          <div ref={dropdownRef} className="relative">
            <input
              type="text"
              onClick={() => setIsPriority(!isPriority)}
              readOnly
              placeholder="Enter priority level"
              autoComplete="off"
              className="w-full cursor-pointer rounded-[8px] h-11 px-4 bg-[#f5f5f5] outline-none capitalize tracking-[1px] placeholder:tracking-[0px]"
              name="priority"
              value={formik.values.priority}
            />
            {formik.errors.priority && <span className="text-sm text-red-400/90 px-1">{formik.errors.priority}</span>}
            {isPriority && (
              <ul className="absolute top-12 z-50 left-0 w-full overflow-hidden bg-white rounded-[8px] text-[#3485bd] shadow-lg">
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
          <div ref={userdownRef} className="relative">
            <input
              onClick={() => setIsUser(!isUser)}
              type="text"
              readOnly
              placeholder="Select the user"
              autoComplete="off"
              className="w-full cursor-pointer rounded-[8px] h-11 px-4 bg-[#f5f5f5] outline-none capitalize tracking-[1px] placeholder:tracking-[0px]"
              name="user"
              value={formik.values.user?.username || ""}
            />
            {formik.errors.user && <span className="text-sm text-red-400/90 px-1">User is Required</span>}
            {isUser && (
              <ul className="absolute top-12 z-50 left-0 w-full overflow-hidden bg-white rounded-[8px] text-[#3485bd] shadow-lg">
                {userData?.map((data) => (
                  <li
                    key={data._id}
                    onClick={() => {
                      formik.setFieldValue("user", data);
                      setIsUser(false);
                    }}
                    className="p-2 cursor-pointer hover:bg-[#3485bd]/50"
                  >
                    {data.username}
                  </li>
                ))}
              </ul>
            )}
          </div>
        </div>
        <div className="flex items-center justify-center gap-4">
          <button
            onClick={()=>{onClose(); formik.resetForm();}}
            className="py-2 w-[40%] cursor-pointer border border-blue-400 rounded-[25px] hover:bg-blue-400 hover:text-white text-blue-400 font-semibold"
          >
            Close
          </button>
          <button
            type="submit"
            onClick={formik.handleSubmit}
            className="py-2 w-[40%] cursor-pointer rounded-[25px] text-white border hover:bg-blue-400 bg-blue-400/90 font-semibold"
          >
            Submit
          </button>
        </div>
      </div>
    </div>
  );
};

export default TodoPopup;
