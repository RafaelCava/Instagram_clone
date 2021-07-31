import './App.css';
import { useEffect, useState } from 'react';
import Header from './components/Header'
import Post from './components/Post'
import { db } from './firebase';
// import { db } from './firebase'

function App() {
  const [user, setUser] = useState()
  const [posts, setPosts] = useState([]);

  useEffect(() => {

    db.collection('posts').orderBy('timestamp', 'desc').onSnapshot((snapshot) => {
      setPosts(snapshot.docs.map((document) => {
        return {
          id: document.id,
          info: document.data()
        }
      }))
    })

  }, [])

  return (
    <div className="App">
      <Header setUser={setUser} user={user}></Header>
      {
        posts.map(val => {
          return (
            <>
              <Post info={val.info} id={val.id} />
              <Post info={val.info} id={val.id} />
            </>
          )
        })
      }
    </div>
  );
}

export default App;
