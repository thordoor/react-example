import { useEffect, useState } from 'react'
import './App.css'

type User = {
  id: number
  name: string
}

function App() {
  const [users, setUsers] = useState<User[]>([]);
  const [search, setSearch] = useState<string>('');

  const allUsers = () => {
    if (window.localStorage.getItem('users')) {
      setUsers(JSON.parse(window.localStorage.getItem('users')!));
    } else {
      fetch('https://jsonplaceholder.typicode.com/users')
        .then((res) => res.json())
        .then((data) => {
          setUsers(data)
          window.localStorage.setItem('users', JSON.stringify(data));
        })
    } 
  }

  const handleSearch = () => {
    if (search === '') return allUsers();
    const filteredUsers = users.filter((user) => user.name.toLocaleLowerCase().includes(search.trim().toLocaleLowerCase()));
    setUsers(filteredUsers);
  };

  useEffect(() => {
    allUsers();
  }, []);

  return (
    <>
      <div>
        <input style={{ marginRight: '5px' }} type='text' onChange={(e) => setSearch(e.target.value)}></input>
        <button onClick={handleSearch}>Search!</button>
      </div>
      <br />
      <div>
        <div className='grid'>
          {users.map((user) => (
            <div className='column' key={user.id}>{user.name}</div>
            ))}
        </div>
      </div>
    </>
  )
}

export default App
