import React from 'react';
import styled from 'styled-components';
import TodoListItem from './TodoListItem';
import palette from '../../styles/palette';

export interface ITodos {
  id: number;
  todo: string;
  isCompleted: boolean;
  userId: number;
}
interface TodosProps {
  todos: ITodos[];
  setTodos: React.Dispatch<React.SetStateAction<never[]>>;
}

function TodoList({ todos, setTodos }: TodosProps) {
  return (
    <TodoListWrapper>
      {todos.length === 0 && (
        <EmptyTodos>해야 할 일 들을 채워주세요!</EmptyTodos>
      )}
      {todos.map(todo => (
        <TodoListItem items={todo} key={todo.id} setTodos={setTodos} />
      ))}
    </TodoListWrapper>
  );
}

export default TodoList;

const TodoListWrapper = styled.div`
  min-height: 320px;
  max-height: 513px;
  overflow-y: auto;
`;

const EmptyTodos = styled.div`
  text-align: center;
  margin-top: 8rem;
  color: ${palette.gray[5]};
  font-size: 2rem;
`;
