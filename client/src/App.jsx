
import './App.css'
import {useEffect, useState} from "react";



function App() {
    const [todoList, setTodoList] = useState([])
    const [title, setTitle] = useState('')

    const fetchAll = () => {
        fetch('http://localhost:8000/api/todo')
            .then(res => res.json())
            .then(data => setTodoList(data))
            .catch(err => console.log(err));
    }

    useEffect(() => {
        fetchAll();
    }, []);

    const handleStatus = (id, status) => {
        fetch(`http://localhost:8000/api/todo/${id}`, {
            method: 'PUT',
            headers: {
                'content-type': 'application/json'
            },
            body: JSON.stringify({
                status: !status
            })
        }).then(fetchAll)
    }

    const handleTitleChange = (event) => {
        setTitle(event.target.value)
    }

    const handleTitleSubmit = () => {
        fetch('http://localhost:8000/api/todo', {
            method: 'POST',
            headers: {
                'content-type': 'application/json',
            },
            body: JSON.stringify({
                title: title
            })
        }).then(() => {fetchAll(); setTitle('')})
    }

    const handleDelete = (id) => {
        fetch(`http://localhost:8000/api/todo/${id}`, {
            method: 'DELETE',
            headers: {
                'content-type': 'application/json'
            },
        }).then(fetchAll)
    }


   return (
      <div className='m-5'>
          <h1 className="text-2xl font-bold mb-4">Todo List</h1>
          <input className='border border-black p-2' onChange={handleTitleChange} value={title}/>
          <button className='border bg-blue-500 border-black text-amber-50 m-2 rounded p-2'  onClick={handleTitleSubmit}> Add TODO</button>
          <ul>

                  {todoList.map((todo) => (
                      <li key={todo.id} >
                          <input
                              type="checkbox"
                              className="mr-2"
                              checked={todo.status}
                              onChange={() => handleStatus(todo.id, todo.status)}
                          />
                          <span>
                            {todo.title}
                          </span>
                          <button className='border ml-4 bg-red-600 text-amber-50 px-2' onClick={() => handleDelete(todo.id)}>x</button>
                      </li>
                  ))}
          </ul>
      </div>

  )
}

export default App
