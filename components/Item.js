import React, {PropTypes, defaultProps, Component} from 'react'; 

class Item extends Component {
  render() {
    const {text, onClick} = this.props; 
    const textDeco = this.props.completed ? 'line-through' : 'none';
    const classname = this.props.completed ? 'icon-check icon' : 'icon-check-empty icon';
    
    return (
        <li onClick={onClick()} className="done"
            style={{ textDecoration: this.props.completed ? 'line-through' : 'none'}} >
                {text}
                <i className={ classname }></i>
        </li>
    );
  }
}

export default Item 

