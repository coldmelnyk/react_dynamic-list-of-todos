import React, { Dispatch, SetStateAction, useEffect, useState } from 'react';
import { Loader } from '../Loader';
import { getUser } from '../../api';
import { User } from '../../types/User';
import { Todo } from '../../types/Todo';

type Props = {
  onSelectedTodo: Dispatch<SetStateAction<Todo | null>>;
  selectedUserId: number;
  selectedTodo: Todo | null;
};

export const TodoModal: React.FC<Props> = ({
  onSelectedTodo,
  selectedUserId,
  selectedTodo,
}) => {
  const [user, setUser] = useState<User | null>(null);

  useEffect(() => {
    getUser(selectedUserId).then(setUser);
  }, []);

  const isLoaded = selectedTodo && user;

  return (
    <div className="modal is-active" data-cy="modal">
      <div className="modal-background" />

      {!isLoaded ? (
        <Loader />
      ) : (
        <div className="modal-card">
          <header className="modal-card-head">
            <div
              className="modal-card-title has-text-weight-medium"
              data-cy="modal-header"
            >
              Todo #{selectedTodo.id}
            </div>

            {/* eslint-disable-next-line jsx-a11y/control-has-associated-label */}
            <button
              onClick={() => onSelectedTodo(null)}
              type="button"
              className="delete"
              data-cy="modal-close"
            />
          </header>

          <div className="modal-card-body">
            <p className="block" data-cy="modal-title">
              {selectedTodo.title}
            </p>

            <p className="block" data-cy="modal-user">
              {selectedTodo.completed ? (
                <strong className="has-text-success">Done</strong>
              ) : (
                <strong className="has-text-danger">Planned</strong>
              )}

              {' by '}

              <a href={`mailto:${user?.email}`}>{user?.name}</a>
            </p>
          </div>
        </div>
      )}
    </div>
  );
};
