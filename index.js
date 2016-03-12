import React    from 'react';
import ReactDOM from 'react-dom';
import Todo     from './components/Todo';
import './assets/style.css';

const todos = [
  {"id": 1, "text": "This is one comment", completed: false},
  {"id": 2, "text": "This is comment", completed: false}
];

ReactDOM.render(
  <Todo todos={todos} />,
  document.getElementById('app')
);
