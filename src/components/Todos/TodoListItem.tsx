import React, { useState, useEffect, useCallback } from 'react';
import styled from 'styled-components';
import axios from 'axios';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faSquare, faTrashCan } from '@fortawesome/free-regular-svg-icons';
import { faSquareCheck } from '@fortawesome/free-solid-svg-icons';
import { ITodos } from './TodoList';
import API from '../../config';

interface TodoProps {
  items: ITodos;
  setTodos: React.Dispatch<React.SetStateAction<never[]>>;
}

interface StyleProps {
  isCompleted: boolean | null;
}

function TodoListItem({ items, setTodos }: TodoProps) {
  const { todo, isCompleted, id } = items;
  const [isDone, setIsDone] = useState(isCompleted);
  const token = localStorage.getItem('access_token');

  const getDoneTodo = async () => {
    setIsDone(prev => !prev);
    await axios
      .put(
        `${API.UPDATE_DELETE_TODO}/${id}`,
        { todo, isCompleted: isDone },
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
  };

  const deleteTodo = async () => {
    await axios
      .delete(`${API.UPDATE_DELETE_TODO}/${id}`, {
        headers: { Authorization: `Bearer ${token}` },
      })
      .catch(err => console.error(err));

    axios
      .get(API.CREATE_GET_TODO, {
        headers: { Authorization: `Bearer ${token}` },
      })
      .then(res => {
        setTodos(res.data);
      })
      .catch(err => console.error(err));
  };

  return (
    <TodoListItemWrapper>
      <CheckBox
        isCompleted={isCompleted}
        onClick={() => {
          getDoneTodo();
        }}
      >
        {isCompleted ? (
          <FontAwesomeIcon icon={faSquareCheck} />
        ) : (
          <FontAwesomeIcon icon={faSquare} />
        )}

        <Text isCompleted={isCompleted}>{todo}</Text>
      </CheckBox>
      <Remove
        onClick={() => {
          deleteTodo();
        }}
      >
        <FontAwesomeIcon icon={faTrashCan} />
      </Remove>
    </TodoListItemWrapper>
  );
}

export default TodoListItem;

const TodoListItemWrapper = styled.div`
  padding: 1rem;
  display: flex;
  align-items: center;
  &:nth-child(even) {
    background: #f8f9fa;
  }

  & + & {
    border-top: 1px solid #dee2e6;
  }
`;

const CheckBox = styled.div<StyleProps>`
  cursor: pointer;
  flex: 1;
  display: flex;
  align-items: center;
  svg {
    font-size: 1.5rem;
    color: ${({ isCompleted }) => (!isCompleted ? 'inherit' : '#22b8cf')};
  }
`;

const Text = styled.div<StyleProps>`
  margin-left: 0.5rem;
  flex: 1;

  color: ${({ isCompleted }) => (!isCompleted ? '#000000' : '#adb5bd')};
  text-decoration: ${({ isCompleted }) =>
    !isCompleted ? 'none' : 'line-through'};
`;

const Remove = styled.div`
  display: flex;
  align-items: center;
  font-size: 1.5rem;
  color: #ff6b6b;
  cursor: pointer;
  &:hover {
    color: #ff8787;
  }
`;
