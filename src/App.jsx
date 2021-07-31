import logo from './logo.svg';
import './App.css';
import { useEffect, useState } from 'react';

function App() {

  const [user, setUser] = useState('rafael')

  useEffect(() => {

  }, [])

  return (
    <div className="App">
      <div className="header">
        <div className="center">

          <div className="header-logo">
            <a href=""><img src="https://www.instagram.com/static/images/web/mobile_nav_type_logo.png/735145cfe0a4.png" alt="logo_insta" /></a>
          </div>
          {
            (user) ?
              <div className='header_logadoInfo'>
                <span>Olá <b>{user}</b></span>
                <a href="#">Postar!</a>
                </div>
              :
              <div className="header-loginForm">
                <form action="">
                  <input type="text" placeholder="Login..." />
                  <input type="password" placeholder="Senha..." />
                  <input type="submit" value="Logar!" name='acao' />
                </form>
                <div className="btn_criarConta">
                  <a href="#">Criar conta!</a>
                </div>
              </div>
          }
        </div>
      </div>

    </div>
  );
}

export default App;
