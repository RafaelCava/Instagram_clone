import { useState } from 'react';
import firebase from 'firebase';
import { auth, db, storage } from '../firebase';

const Header = ({ user, setUser }) => {
  const [progress, setProgress] = useState(0);

  const [file, setFile] = useState(null);

  function abrirModalCriarConta(e) {
    e.preventDefault();
    const modal = document.querySelector('.modalCriarConta');
    modal.style.display = 'block';
  }

  function fecharModalCriarConta(e) {
    e.preventDefault();
    const modal = document.querySelector('.modalCriarConta');
    modal.style.display = 'none';
  }

  // criar conta firebase
  function criarConta(e) {
    e.preventDefault();

    const email = document.querySelector('#email-cadastro').value;
    const username = document.querySelector('#username-cadastro').value;
    const password = document.querySelector('#senha-cadastro').value;

    auth.createUserWithEmailAndPassword(email, password)
      .then((authUser) => {
        authUser.user.updateProfile({
          displayName: username,
        });
        alert('conta criada com sucesso!');
        const modal = document.querySelector('.modalCriarConta');
        modal.style.display = 'none';
      }).catch((error) => {
        alert(error.message);
      });
  }

  function logar(e) {
    e.preventDefault();
    const email_login = document.querySelector('#email-login').value;
    const senha_login = document.querySelector('#senha-login').value;

    auth.signInWithEmailAndPassword(email_login, senha_login)
      .then((auth) => {
        setUser(auth.user.displayName);
        alert('logado com sucesso');
        window.location.href = '/';
      }).catch((error) => {
        alert(error.message);
      });
  }

  function abrirModalUpload(e) {
    e.preventDefault();
    const modal = document.querySelector('.modalUpload');
    modal.style.display = 'block';
  }

  function fecharModalUpload(e) {
    e.preventDefault();
    const modal = document.querySelector('.modalUpload');
    modal.style.display = 'none';
  }

  function uploadPost(e) {
    e.preventDefault();
    const tituloPost = document.querySelector('#titulo-upload').value;

    const uploadTask = storage.ref(`images/${file.name}`).put(file);

    uploadTask.on('state_changed', (snapshot) => {
      const progress = Math.round(snapshot.bytesTransferred / snapshot.totalBytes) * 100;
      setProgress(progress);
    }, (_error) => {

    }, () => {
      storage.ref('images').child(file.name).getDownloadURL()
        .then((url) => {
          db.collection('posts').add({
            titulo: tituloPost,
            image: url,
            userName: user,
            timestamp: firebase.firestore.FieldValue.serverTimestamp(),
          });
          setProgress(0);
          setFile(null);
          alert('upload realizado com sucesso');
          document.getElementById('form-upload').reset();
        });
    });
  }

  function deslogar(e) {
    e.preventDefault();
    auth.signOut().then((_val) => {
      setUser(null);
      window.location.href = '/';
    });
  }

  return (

    <div className="header">
      <div className="modalCriarConta">
        <div className="formCriarConta">
          <div onClick={(e) => fecharModalCriarConta(e)} className="close-modal-criar">X</div>
          <h2>Criar Conta</h2>
          <form onSubmit={(e) => criarConta(e)}>
            <input id="email-cadastro" type="email" placeholder="Seu Email..." required />
            <input id="username-cadastro" type="text" placeholder="Seu Nome..." required />
            <input id="senha-cadastro" type="password" placeholder="Sua Senha..." required />
            <input type="submit" value="Criar Conta!" />
          </form>

        </div>
        {/* formCriarConta */}

      </div>
      {/* modalCriarConta */}

      {/* Fazer upload */}

      <div className="modalUpload">
        <div className="formUpload">
          <div onClick={(e) => fecharModalUpload(e)} className="close-modal-criar">X</div>
          <h2>Fazer Upload</h2>
          <form id="form-upload" onSubmit={(e) => uploadPost(e)}>
            <progress id="progress-upload" value={progress} />
            <input id="titulo-upload" type="text" placeholder="Nome da sua Foto.." />
            <input onChange={(e) => setFile(e.target.files[0])} type="file" name="file" required />
            <input type="submit" value="Postar no instagram!" />
          </form>
        </div>
        {/* formUpload */}
      </div>
      {/* modalUpload */}

      <div className="center">

        <div className="header-logo">
          <a href=""><img src="https://www.instagram.com/static/images/web/mobile_nav_type_logo.png/735145cfe0a4.png" alt="logo_insta" /></a>
        </div>
        {/* header-logo */}
        {
          (user)
            ? (
              <div className="header_logadoInfo">
                <span>
                  Olá
                  <b>{user}</b>
                </span>
                <a onClick={(e) => abrirModalUpload(e)} href="#">Postar!</a>
                <a onClick={(e) => deslogar(e)} href="#">Deslogar</a>
                {/* header_logadoInfo */}
              </div>
            )
            : (
              <div className="header-loginForm">
                <form onSubmit={(e) => logar(e)}>
                  <input id="email-login" type="email" placeholder="Login..." required />
                  <input id="senha-login" type="password" placeholder="Senha..." required />
                  <input type="submit" value="Logar!" name="acao" />
                </form>
                <div className="btn_criarConta">
                  <a onClick={(e) => abrirModalCriarConta(e)} href="#">Criar conta!</a>
                </div>
                {/* btn_criarConta */}

                {/* header-loginForm */}
              </div>
            )
        }
      </div>
      {/* center */}
      {/* header */}
    </div>
  );
};

export default Header;
