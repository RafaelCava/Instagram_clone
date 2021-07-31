import { useEffect, useState } from 'react';
import { auth, db } from '../firebase'

const Header = ({ user, setUser }) => {


  function abrirModalCriarConta(e) {
    e.preventDefault();
    let modal = document.querySelector('.modalCriarConta')
    modal.style.display = "block"
  }

  function fecharModalCriarConta(e) {
    e.preventDefault();
    let modal = document.querySelector('.modalCriarConta')
    modal.style.display = "none"
  }

  function criarConta(e) {
    e.preventDefault();
    // criar conta firebase

    const email = document.querySelector('#email-cadastro').value
    const username = document.querySelector('#username-cadastro').value
    const password = document.querySelector('#senha-cadastro').value

    auth.createUserWithEmailAndPassword(email, password)
      .then((authUser) => {
        authUser.user.updateProfile({
          displayName: username
        })
        alert("conta criada com sucesso!")
        let modal = document.querySelector('.modalCriarConta')
        modal.style.display = "none"
      }).catch((error) =>{
        alert(error.message)
      })
  }

  function logar(e){
    e.preventDefault();
    let email_login = document.querySelector('#email-login').value
    let senha_login = document.querySelector('#senha-login').value

    auth.signInWithEmailAndPassword(email_login, senha_login)
    .then((auth) =>{
      setUser(auth.user.displayName);
      alert('logado com sucesso')
    }).catch((error)=>{
      alert(error.message)
    })
  }

  return (


    <div className="header">
      <div className="modalCriarConta" >
        <div className="formCriarConta">
          <div onClick={e => fecharModalCriarConta(e)} className="close-modal-criar">X</div>
          <h2>Criar Conta</h2>
          <form onSubmit={(e) => criarConta(e)}>
            <input id='email-cadastro' type="email" placeholder="Seu Email..." required />
            <input id='username-cadastro' type="text" placeholder="Seu Nome..." required />
            <input id='senha-cadastro' type="password" placeholder="Sua Senha..." required />
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
              <form onSubmit={(e)=>logar(e)}>
                <input id='email-login' type="email" placeholder="Login..." required />
                <input id='senha-login' type="password" placeholder="Senha..." required />
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