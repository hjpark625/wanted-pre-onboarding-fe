import React, { useState } from 'react';
import styled from 'styled-components';
import axios from 'axios';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPlus } from '@fortawesome/free-solid-svg-icons';
import API from '../../config';

function TodoInsert({
  setTodos,
}: {
  setTodos: React.Dispatch<React.SetStateAction<never[]>>;
}) {
  const [todoValue, setTodoValue] = useState('');

  const token = localStorage.getItem('access_token');

  const getInputValue = (e: React.ChangeEvent<HTMLInputElement>) => {
    setTodoValue(e.target.value);
  };

  const onSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    await axios
      .post(
        API.CREATE_GET_TODO,
        { todo: todoValue },
        {
          headers: {
            Authorization: `Bearer ${token}`,
            'Content-Type': 'application/json',
          },
        }
      )
      .catch(err => console.error(err));

    axios
      .get(API.CREATE_GET_TODO, {
        headers: { Authorization: `Bearer ${token}` },
      })
      .then(res => {
        setTodos(res.data);
      })
      .catch(err => console.error(err));
    setTodoValue('');
  };

  return (
    <TodoInsertForm
      onSubmit={e => {
        onSubmit(e);
      }}
    >
      <TodoInput
        placeholder="할 일을 입력하세요"
        value={todoValue}
        onChange={e => {
          getInputValue(e);
        }}
      />
      <AddButton type="submit">
        <FontAwesomeIcon icon={faPlus} />
      </AddButton>
    </TodoInsertForm>
  );
}

export default TodoInsert;

const TodoInsertForm = styled.form`
  display: flex;
  background: #495057;
  position: sticky;
  top: 0;
`;

const TodoInput = styled.input`
  background: none;
  outline: none;
  border: none;
  padding: 0.5rem;
  font-size: 1.125rem;
  line-height: 1.5;
  color: white;
  &::placeholder {
    color: #dee2e6;
  }
  flex: 1;
`;

const AddButton = styled.button`
  background: none;
  outline: none;
  border: none;
  background: #868e96;
  color: white;
  padding-left: 1rem;
  padding-right: 1rem;
  font-size: 1.5rem;
  display: flex;
  align-items: center;
  cursor: pointer;
  transition: background 0.1s ease-in;
  &:hover {
    background: #adb5bd;
  }
`;
