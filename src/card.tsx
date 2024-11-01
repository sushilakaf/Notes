// CardNote.js
import { Card, Input } from "antd";
import './App.css';
import { useState } from "react";
import logo from './assets/illustrator-designer-man-holding-digital-tablet_107791-12062.avif';
import TextArea from "antd/es/input/TextArea";
import Button from "./button";

function CardNote() {
  const [title, setTitle] = useState('');
  const [content, setContent] = useState('');
  const [todos, setTodos] = useState<{ title: string; content: string }[]>([]);
  const [update, setUpdate] = useState(null);

  const addTodo = () => {
    if (title && content) {
      if (todos.some(todo => todo.title === title)) {
        alert("Title already exists");
        return;
      }
      const newTodo = { title, content };
      setTodos([...todos, newTodo]);
      resetForm();
    } else {
      alert("Please enter both a title and content.");
    }
  };

  const deleteTodo = (index) => {
    const newTodos = todos.filter((_, i) => i !== index);
    setTodos(newTodos);
  };

  const updateTodo = () => {
    if (update !== null) {
      const updatedTodos = todos.map((todo, index) =>
        index === update ? { title, content } : todo
      );
      setTodos(updatedTodos);
      resetForm();
    }
  };

  const editTodo = (index) => {
    setUpdate(index);
    setTitle(todos[index].title);
    setContent(todos[index].content);
  };

  const resetForm = () => {
    setTitle('');
    setContent('');
    setUpdate(null);
  };

  return (
    <div className="main">
      <div>
        <img src={logo} className="img-style" alt="Logo" />
      </div>
      <Card hoverable className="cardStyle">
        <div className="content">
          <div>
            <h2>Title</h2>
            <Input
              placeholder="Write your title..."
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              style={{ width: '100%',height:'50px' }}
            />
          </div>
          <div>
            <h2>Content</h2>
            <TextArea
              value={content}
              onChange={(e) => setContent(e.target.value)}
              placeholder="Write your content..."
              autoSize={{ minRows: 3, maxRows: 5 }}
              style={{ width: '100%', height: '300px', fontSize: '16px' }}
            />
          </div>
          <div className="buttonStyle">
            <Button onClick={update !== null ? updateTodo : addTodo}>
              {update !== null ? 'Update' : 'Add'}
            </Button>
          </div>
        </div>
        <h2>List of Tasks</h2>
        <div className="todo-list-item">
          {todos.map((todo, index) => (
            <div key={index} className="todo-item">
              <div className="todo-content">
                <h2>{todo.title}</h2>
                <p>{todo.content}</p>
              </div>
              <div className="todo-buttons">
                <Button onClick={() => editTodo(index)}>Edit</Button>
                <Button onClick={() => deleteTodo(index)}>Delete</Button>
              </div>
            </div>
          ))}
        </div>
      </Card>
    </div>
  );
}

export default CardNote;
