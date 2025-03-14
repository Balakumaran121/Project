import express from 'express'
import { createTodo, deleteTodo, getTodoById, getTodos, updateTodo } from '../controllers/todoController.js';
import authMiddleWare from '../middlewares/authMiddleware.js';

const router = express.Router();

router.get("/",authMiddleWare,getTodos);
router.post("/create-todo",createTodo)
router.get("/:id",getTodoById)
router.put("/update/:id",updateTodo)
router.delete("/delete/:id",deleteTodo)

export default router;