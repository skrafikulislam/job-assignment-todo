import express from "express";
import {
  deleteTodo,
  getTodo,
  saveTodo,
  updateTodo,
} from "../controllers/TodoController.js";

const router = express.Router();

router.get("/", getTodo);
router.post("/save", saveTodo);
router.put("/update", updateTodo);
router.get("/api/todos", async (req, res) => {
  const page = parseInt(req.query.page) || 1;
  const limit = parseInt(req.query.limit) || 10;
  const skip = (page - 1) * limit;

  try {
    const todos = await Todo.find().skip(skip).limit(limit);
    const totalCount = await Todo.countDocuments();
    res.json({
      todos,
      currentPage: page,
      totalPages: Math.ceil(totalCount / limit),
    });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});
router.delete("/delete", deleteTodo);

export default router;
