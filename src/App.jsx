import './App.css';
import { useEffect, useState } from 'react';
import Header from './components/Header';
import Post from './components/Post';
import { db, auth } from './firebase';

function App() {
  const [user, setUser] = useState();
  const [posts, setPosts] = useState([]);

  useEffect(() => {
    auth.onAuthStateChanged((val) => {
      setUser(val.displayName);
    });

    db.collection('posts').orderBy('timestamp', 'desc').onSnapshot((snapshot) => {
      setPosts(snapshot.docs.map((document) => ({
        id: document.id,
        info: document.data(),
      })));
    });
  }, []);

  return (
    <div className="App">
      <Header setUser={setUser} user={user} />
      {
        posts.map((val) => (
          <>
            <Post user={user} info={val.info} id={val.id} />
          </>
        ))
      }
    </div>
  );
}

export default App;
