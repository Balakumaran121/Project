import { create } from 'zustand'
const useStore = create((set) => ({
    editTodoData: null,
    setEditTodo: (todo) => set({ editTodoData: todo }),
}))
export default useStore