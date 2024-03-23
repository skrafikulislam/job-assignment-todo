import TodoModel from "../models/TodoModelSchema.js";

export const getTodo = async (req, res) => {
  let query = {};
  const page = parseInt(req.query.page) || 1;
  const limit = parseInt(req.query.limit) || 10;

   
  const searchData = req.query.search;
  if (searchData) {
    query = {
      $or: [
        { title: { $regex: searchData, $options: "i" } },
        { desc: { $regex: searchData, $options: "i" } },
        { date: { $regex: searchData, $options: "i" } },
      ],
    };
  }

  try {
    const skip = (page - 1) * limit;
    const todos = await TodoModel.find(query).skip(skip).limit(limit);

    const totalTodos = await TodoModel.countDocuments();
    const totalPages = Math.ceil(totalTodos / limit);

    res.status(200).json({
      data: todos,
      currentPage: page,
      totalPages: totalPages,
      totalItems: totalTodos,
    });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

export const saveTodo = async (req, res) => {
  const { title, desc, date } = req.body;
  await TodoModel.create({ title, desc, date }).then((data) => {
    console.log("Todo Added Successfully");
    console.log(data);
    res.send(data);
  });
};

export const updateTodo = async (req, res) => {
  const { _id, title, desc, date } = req.body;
  await TodoModel.findByIdAndUpdate(_id, { title, desc, date })
    .then(() => res.send("Updated Todo List Successfully"))
    .catch((err) => console.log(err.message));
};

export const deleteTodo = async (req, res) => {
  const { _id } = req.body;
  await TodoModel.findByIdAndDelete(_id)
    .then(() => res.send("Deleted Todo List Successfully"))
    .catch((err) => console.log(err.message));
};
