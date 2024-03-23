import mongoose from "mongoose";

const TodoSchema = new mongoose.Schema({
  title: {
    type: String,
    required: true,
  },
  desc: {
    type: String,
    required: true,
  },
  date: {
    type: String,
    required: true,
  },
});

const TodoModel = mongoose.model("TodoApp", TodoSchema);

export default TodoModel;
