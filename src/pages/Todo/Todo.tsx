import React, { useState, useEffect } from 'react';
import axios from 'axios';
import TodoTemplate from '../../components/Todos/TodoTemplate';
import TodoInsert from '../../components/Todos/TodoInsert';
import TodoList from '../../components/Todos/TodoList';
import API from '../../config';

function Todo() {
  const [todos, setTodos] = useState([]);

  const token = localStorage.getItem('access_token');

  useEffect(() => {
    axios
      .get(API.CREATE_GET_TODO, {
        headers: { Authorization: `Bearer ${token}` },
      })
      .then(res => {
        setTodos(res.data);
      })
      .catch(err => console.error(err));

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <TodoTemplate>
      <TodoInsert setTodos={setTodos} />
      <TodoList todos={todos} setTodos={setTodos} />
    </TodoTemplate>
  );
}

export default Todo;
