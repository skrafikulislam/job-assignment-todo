import axios from "axios";

const baseUrl = "http://localhost:5000";

const getAllToDO = (setTodo) => {
  axios.get(baseUrl).then(({ data }) => {
    setTodo(data);
  });
};
const fetchData = async ({
  setTodo,
  setTotalPages,
  currentPage,
  perPage,
  search,
}) => {
  try {
    let url = `${baseUrl}?page=${currentPage}&limit=${perPage}`;

     
    if (search) {
      url += `&search=${search}`;
    }
    const response = await axios.get(url);
    setTodo(response.data.data);
    setTotalPages(response.data.totalPages);
    console.log(response.data);
  } catch (error) {
    console.error("Error fetching data:", error);
  }
};

const addTodo = (
  title,
  desc,
  date,
  setTitle,
  setDesc,
  setDate,
  setTodo,
  setTotalPages,
  currentPage,
  perPage
) => {
  axios
    .post(`${baseUrl}/save`, { title, desc, date })
    .then((data) => {
      console.log(data);
      setTitle("");
      setDesc("");
      setDate("");
      fetchData({ setTodo, setTotalPages, currentPage, perPage });
    })
    .catch((err) => {
      console.log(err);
    });
};

const updateTodo = (
  todoId,
  title,
  desc,
  date,
  setTitle,
  setDesc,
  setDate,
  setTodo,
  setIsUpdating,
  setTotalPages,
  currentPage,
  perPage
) => {
  axios
    .put(`${baseUrl}/update`, { _id: todoId, title, desc, date })
    .then(() => {
      setTitle("");
      setDesc("");
      setDate("");
      setIsUpdating(false);
      fetchData({ setTodo, setTotalPages, currentPage, perPage });
    })
    .catch((err) => {
      console.log(err);
    });
};

const deleteTodo = (_id, setTodo, setTotalPages, currentPage, perPage) => {
  axios
    .delete(`${baseUrl}/delete`, { data: { _id } })
    .then(() => {
      fetchData({ setTodo, setTotalPages, currentPage, perPage });
    })
    .catch((err) => {
      console.log(err);
    });
};

export { getAllToDO, addTodo, updateTodo, deleteTodo, fetchData };
