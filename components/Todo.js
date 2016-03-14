import React, {PropTypes, defaultProps, Component} from 'react'; 
import Item from './Item'

class Todo extends Component {
  constructor(props) {
    super(props);
    this.state = {
        todos: props.todos,
        filter: '',
        visibilityFilter: '',
        sort: true 
    };
  }

  toggleTodo(id) {
    let todos = this.state.todos.map(todo => {
        if (todo.id !== id) {
            return todo
        }

        return Object.assign({}, todo, {
            completed: !todo.completed
        })
    })
    this.setState({todos: todos});
  }

  handleKeyChange() {
      this.setState({filter: this.refs.filter.value});
  }
  
  visibilityFilter(param) {
      this.setState({visibilityFilter: param});
  }
  
  sort() {
      this.setState({sort: !this.state.sort});
  }

  handleKeyDown(event) {
    if (event.which === 13) {
        let text = this.refs.text.value;
        let state = this.state.todos;
        this.setState({
            todos: [
                ...state,
                {
                    id: state.length + 1,
                    text: text,
                    completed: false
                }
            ]
        });
        this.refs.text.value = '';

    }
  }

  render() {

    // Filter 
    var shownTodo = [];
    if (this.state.todos) {
        shownTodo = Object.keys(this.state.todos).filter(function (key) {
            let todo = this.state.todos[key];

            if (this.state.visibilityFilter && (this.state.visibilityFilter === 'active') && todo.completed) {
                return;
            }

            if (this.state.visibilityFilter && (this.state.visibilityFilter === 'completed') && !todo.completed) {
                return;
            }

            if (this.state.filter && (todo.text.toLowerCase().indexOf(this.state.filter) === -1)) {
                return;
            }

            return todo;
        }, this);
    }

    var items = [];

    // Add top
    items.push(
        <li className="top">
            You have {shownTodo.length} tasks
        </li>
    );

    // Add header
    items.push(
        <li className="head">
            <i className="icon-sort sort" onClick={this.sort.bind(this)} /> 
            <i className="icon-filter"></i>
            <a href="#" className={ this.state.visibilityFilter === 'all' ? 'selected' : ''} onClick={this.visibilityFilter.bind(this, 'all')} >All</a>
            <a href="#" className={ this.state.visibilityFilter === 'active' ? 'selected' : ''} onClick={this.visibilityFilter.bind(this, 'active')} >Active</a>
            <a href="#" className={ this.state.visibilityFilter === 'completed' ? 'selected' : ''} onClick={this.visibilityFilter.bind(this, 'completed')} >Completed</a>
            <input ref="filter" onKeyUp={this.handleKeyChange.bind(this)} placeholder="Search" />
            <i className="icon-search search"></i>
        </li>
    );
    
    if (this.state.sort) {
        shownTodo.sort();
    } else {
        shownTodo.reverse();
    }

    // Add tasks
    shownTodo.map(function (key) {
      var item = this.state.todos[key];
      items.push(
        <Item
            key={item.id}
            {...item}
            onClick={() => this.toggleTodo.bind(this, item.id)}
        />
      );
    }, this);

    // Add footer
    items.push(
        <li className="footer">
            <input ref="text" onKeyDown={this.handleKeyDown.bind(this)} placeholder="New task" />
            <i className="icon-plus-squared icon"></i>
        </li>
    );



    return (
        <ul>
            {items}
        </ul>
    );
  }
}

Todo.propTypes = { 
    todos: PropTypes.arrayOf(PropTypes.shape({
        id: PropTypes.number.isRequired,
        completed: PropTypes.bool.isRequired,
        text: PropTypes.string.isRequired
    }).isRequired).isRequired
}

export default Todo
