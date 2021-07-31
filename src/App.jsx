import './App.css';
import { useEffect, useState } from 'react';
import Header from './components/Header'

function App() {
  const [user, setUser] = useState('rafael')
  useEffect(() => {

  }, [])

  return (
    <div className="App">
        <Header user={user}></Header>
    </div>
  );
}

export default App;
