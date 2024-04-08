import React, { useState, useEffect } from 'react';
import './App.css';

const App = () => {
  // State variables for todos, selected user, and loading state
  const [todos, setTodos] = useState([]);
  const [userId, setSelectedUser] = useState('1');
  const [loading, setLoadingState] = useState(false);

  // Fetch todos whenever the selected user changes
  useEffect(() => {
    setLoadingState(true); // Set loading state to true while fetching data

    fetch(`https://dummyjson.com/todos/user/${userId}`)
      .then((res) => res.json())
      .then((data) => {
        setTodos(data.todos); // Update todos state with fetched data
        setLoadingState(false); // Set loading state to false after data is loaded
      })
      .catch((error) => {
        console.error('Error fetching data:', error);
        setLoadingState(false); // Set loading state to false if an error occurs
      });
  }, [userId]); // Dependency array ensures useEffect runs when userId changes

  // Handler to update userId based on user selection
  const handleChange = (event) => {
    setSelectedUser(event.target.value);
  };

  return (
    <section className="app-content">
      <header>
        <h1 className="heading">Todos</h1>
      </header>
      <div>
        <label htmlFor="user">Please select a user : </label>
        <select id="user" onChange={handleChange} className="dropdown">
          <option value="1">Arthur</option>
          <option value="2">Lily</option>
          <option value="3">George</option>
        </select>
      </div>
      <main>
        {loading ? (
          <p>Data is getting loaded</p>
        ) : (
          <ul>
            {todos.map((item) => (
              <li key={item.id}>{item.todo}</li>
            ))}
          </ul>
        )}
      </main>
    </section>
  );
};

export default App;
