// import { useEffect, useState } from 'react';

const Header = ({ user }) => {


  function abrirModalCriarConta(e) {
    e.preventDefault();

  }

  return (


    <div className="header">
      <div className="modalCriarConta" >
        <div className="formCriarConta">
          <h2>Criar Conta</h2>
          <form>
            <input type="email" placeholder="Seu Email..." required/>
            <input type="text" placeholder="Seu Nome..." required/>
            <input type="password" placeholder="Sua Senha..." required/>
            <input type="submit" value="Criar Conta!" />
          </form>

        </div>

      </div>
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
                <input type="text" placeholder="Login..." required/>
                <input type="password" placeholder="Senha..." required/>
                <input type="submit" value="Logar!" name='acao' />
              </form>
              <div className="btn_criarConta">
                <a onClick={e => abrirModalCriarConta(e)} href="#">Criar conta!</a>
              </div>
            </div>
        }
      </div>
    </div>
  )
}

export default Header