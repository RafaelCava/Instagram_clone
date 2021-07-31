import './App.css';
import { useEffect, useState } from 'react';
import Header from './components/Header'
// import { db } from './firebase'

function App() {
  const [user, setUser] = useState(null)
  useEffect(() => {

  }, [])

  return (
    <div className="App">
        <Header setUser={setUser} user={user}></Header>
    </div>
  );
}

export default App;
