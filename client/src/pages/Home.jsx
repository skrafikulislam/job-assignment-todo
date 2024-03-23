import Todo from "../components/Todo";
import {
  addTodo,
  updateTodo,
  deleteTodo,
  fetchData,
} from "../utils/HandleApi";
import { useEffect, useState } from "react";
import ReactPaginate from "react-paginate";
import "./Home.css";
import { useNavigate } from "react-router-dom";
import { useCookies } from "react-cookie";
import axios from 'axios'

function App() {
  const navigate = useNavigate();
  const [cookies, removeCookie] = useCookies([]);
  



  const Logout = () => {
    removeCookie("token");
    navigate("/");
  };

  const [todo, setTodo] = useState([]);
  const [title, setTitle] = useState("");
  const [desc, setDesc] = useState("");
  const [date, setDate] = useState("");
  const [isUpdating, setIsUpdating] = useState(false);
  const [todoId, setTodoId] = useState("");

  const [search, setSearch] = useState("");
  const [currentPage, setCurrentPage] = useState(0);
  const [totalPages, setTotalPages] = useState(0);
  const perPage = 10;

  const updateMode = (_id, title, desc, date) => {
    setIsUpdating(true);
    setTitle(title);
    setDesc(desc);
    setDate(date);
    setTodoId(_id);
  };

  useEffect(() => {
    const fetchWithPage = () => {
      fetchData({ setTodo, setTotalPages, currentPage, perPage, search });
    };
    fetchWithPage();
  }, [currentPage, search]);

  const handlePageClick = (selectedPage) => {
    setCurrentPage(selectedPage.selected + 1);
  };

  const handleSearch = (e) => {
    setSearch(e.target.value);
  };

  return (
    <div className="App">
      <div className="container">
        <h1>Todo-App, hello </h1>
        <button onClick={Logout}>Log Out</button>
        <div style={{ margin: "20px", position: "relative"}}>
          <input
            placeholder="Search..."
            style={{
              padding: "8px 32px 8px 32px",
              borderRadius: "4px",
              border: "1px solid #ccc",
              width: "100%",
              boxSizing: "border-box",
              margin: "20px",
            }}
            onChange={handleSearch}
          />
        </div>
        <div className="top">
          <input
            type="text"
            placeholder="Add ToDo Title....."
            value={title}
            onChange={(e) => setTitle(e.target.value)}
          />
          <input
            type="text"
            placeholder="Add ToDo Description....."
            value={desc}
            onChange={(e) => setDesc(e.target.value)}
          />
          <input
            type="text"
            placeholder="Add ToDo Date....."
            value={date}
            onChange={(e) => setDate(e.target.value)}
          />
          <div
            className="add-btn"
            onClick={
              isUpdating
                ? () =>
                    updateTodo(
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
                    )
                : () =>
                    addTodo(
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
                    )
            }
          >
            {isUpdating ? "Update" : "Add"}
          </div>
        </div>
        <div className="list">
          {todo.map((item, i) => {
            return (
              <Todo
                key={i}
                title={item.title}
                desc={item.desc}
                date={item.date}
                updateMode={() =>
                  updateMode(item._id, item.title, item.desc, item.date)
                }
                deleteTodo={() =>
                  deleteTodo(
                    item._id,
                    setTodo,
                    setTotalPages,
                    currentPage,
                    perPage
                  )
                }
              />
            );
          })}
          <div
            style={{
              display: "flex",
              flexDirection: "column",
              justifyContent: "center",
              padding: 20,
              boxSizing: "border-box",
              width: "100%",
              height: "100%",
            }}
          >
            <ReactPaginate
              previousLabel={"previous"}
              nextLabel={"next"}
              breakLabel={"..."}
              pageCount={totalPages}
              pageRangeDisplayed={10}
              onPageChange={handlePageClick}
              activeClassName="pagination-active"  
              breakClassName="pagination-break" 
              containerClassName="pagination-container"  
              marginPagesDisplayed={2}  
              nextClassName="pagination-next-prev"  
              l
              pageClassName="pagination-page"  
              previousClassName="pagination-next-prev"
            />
          </div>
        </div>
      </div>
    </div>
  );
}

export default App;
