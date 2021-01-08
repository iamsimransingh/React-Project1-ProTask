import React, { useState, useEffect } from "react";
import './App.css';
import Form from "./Components/Form";//importing components
import TodoList from "./Components/TodoList"; //importing components
function App() {
  //state stuff
  const [inputText, setInputText] = useState(""); //state for input in the list
  const [todos, setTodos] = useState([]); //state for storing input of todos,in array of objects
  const [status, setStatus] = useState("all");
  const [filteredTodos, setFilteredTodos] = useState([]);
  //run once when starts
  useEffect(() => {
    getLocalTodos();
  }, []);
  //use effect
  useEffect(() => {
      //functions
  const filterHandler = () => {
    switch(status){
      case 'completed':
        setFilteredTodos(todos.filter(todo => todo.completed === true));
        break;
      case 'uncompleted':
          setFilteredTodos(todos.filter(todo => todo.completed === false));
          break;
      default:
           setFilteredTodos(todos);
           break;  
    }
  };
  saveLocalTodos();
    filterHandler();
    
  }, [todos, status]);
 //save to local
 const saveLocalTodos = () => {
     localStorage.setItem("todos",JSON.stringify(todos));
 };
 const getLocalTodos = () => {
  if(localStorage.getItem('todos') == null){
    localStorage.setItem('todos',JSON.stringify([]));
  }else{
    let todoLocal = JSON.parse(localStorage.getItem('todos'));
    setTodos(todoLocal);
  }
 };
  
  return (
    <div className="App">
      <header>
  <h1>ProTask</h1>
      </header>
      <Form 
      todos={todos} 
      setTodos={setTodos} 
      setInputText={setInputText} 
      inputText={inputText}
      setStatus={setStatus}
      />   
      <TodoList 
      filteredTodos={filteredTodos}
      setTodos={setTodos} 
      todos={todos} />  
    </div>
  );
}

export default App;
