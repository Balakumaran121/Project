import { Todo } from "../models/todo.model.js";

export const getTodos = async (req, res) => {
    try {
        const { page = 1, limit = 10, user } = req.query;
        const query = req.user.role === "admin" ? {} : { user: req.user.id }
        if (user) {
            query.user = user
        }
        // if (!req.user || !req.user.id) {
        //     return res.status(403).json({ success: false, message: "Unauthorized" });
        // }
        const result = await Todo.find(query).populate("user").skip((page - 1) * limit).limit(parseInt(limit))
        const totalTodos = await Todo.countDocuments(query)
        res.send({
            success: true,
            message: "Todo fetched successfully.",
            data: result,
            pagination: {
                totalItems: totalTodos,
                totalPages: Math.ceil(totalTodos / limit),
                currentPage: parseInt(page),
                pageSize: parseInt(limit)
            }
        })
    }
    catch (error) {
        res.send({
            success: false,
            message: "Failed to fetch todo.",
            data: [],
        })
    }
}

export const createTodo = async (req, res) => {
    const todoDetails = req.body
    try {
        const result = await Todo.create(todoDetails)
        res.send({
            success: true,
            message: "Todo created successfully",
            data: result
        })

    }
    catch (error) {
        res.send({
            success: false,
            message: "Failed to create todo",
            data: {},
            error: error
        })
    }
}

export const getTodoById = async (req, res) => {
    const todoId = req.params.id;
    try {
        const result = await Todo.findById(todoId);
        res.send({
            success: true,
            message: "Todo fetched successfully",
            data: result
        })
    }
    catch (error) {
        res.send({
            success: false,
            message: "Failed to fetch todo",
            data: {}
        })
    }
}


export const updateTodo = async (req, res) => {
    try {
        const { id } = req.params
        const updateData = req.body;
        const result = await Todo.findByIdAndUpdate(id, updateData, { new: true });
        if (!result) {
            return res.status(404).json({ success: false, message: "Todo not found" })
        }
        return res.json({ success: true, message: "Todo Updated successfully", data: result })
    }
    catch (error) {
        console.log("Error Updating todo ", error);
        res.status(500).json({ success: false, message: "Failes to update todo." })
    }
}

export const deleteTodo = async (req, res) => {
    try {
        const { id } = req.params
        const result = await Todo.findByIdAndDelete(id);
        if (!result) {
            return res.status(404).json({ success: false, message: "Todo not found" })
        }
        return res.json({ success: true, message: "Todo deleted successfully.", data: result })
    }
    catch (error) {
        console.log("Error deleting todo:", error);
        res.status(500).json({ success: false, message: "Failed to delete todo." })
    }
}