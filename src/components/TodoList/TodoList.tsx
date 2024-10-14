import React, { Dispatch } from 'react';
import { Todo } from '../../types/Todo';
import cn from 'classnames';

interface Props {
  todos: Todo[];
  onSelectedTodo: Dispatch<React.SetStateAction<Todo | null>>;
  selectedTodo: Todo | null;
  onSelectedUserId: Dispatch<React.SetStateAction<number>>;
}

export const TodoList: React.FC<Props> = ({
  todos,
  onSelectedTodo,
  selectedTodo,
  onSelectedUserId,
}) => (
  <table className="table is-narrow is-fullwidth">
    <thead>
      <tr>
        <th>#</th>
        <th>
          <span className="icon">
            <i className="fas fa-check" />
          </span>
        </th>
        <th>Title</th>
        <th> </th>
      </tr>
    </thead>

    <tbody>
      {todos.map(todo => (
        <tr
          key={todo.id}
          data-cy="todo"
          className={cn({
            'has-background-info-light':
              selectedTodo !== null && selectedTodo.id === todo.id,
          })}
        >
          <td className="is-vcentered">{todo.id}</td>
          {todo.completed ? (
            <td className="is-vcentered">
              <span className="icon" data-cy="iconCompleted">
                <i className="fas fa-check" />
              </span>
            </td>
          ) : (
            <td className="is-vcentered" />
          )}
          <td className="is-vcentered is-expanded">
            <p
              className={cn({
                'has-text-success': todo.completed,
                'has-text-danger': !todo.completed,
              })}
            >
              {todo.title}
            </p>
          </td>
          <td className="has-text-right is-vcentered">
            <button
              onClick={() => {
                onSelectedTodo(todo);
                onSelectedUserId(todo.userId);
              }}
              data-cy="selectButton"
              className="button"
              type="button"
            >
              <span className="icon">
                <i
                  className={cn({
                    'far fa-eye': selectedTodo === null,
                    'far fa-eye-slash':
                      selectedTodo !== null && selectedTodo.id === todo.id,
                  })}
                />
              </span>
            </button>
          </td>
        </tr>
      ))}
    </tbody>
  </table>
);
