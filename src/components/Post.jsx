import { db } from '../firebase'
import { useState, useEffect } from 'react';
function Post(props) {

  function comentar(id, e) {
    e.preventDefault();

    let comentarioAtual = document.querySelector('#comentario-'+id).value
    

    db.collection('posts').doc(id).collection('comentarios').add({
      nome: props.user,
      comentario: comentarioAtual
    })

    document.querySelector('#comentario-'+id).value = ''
  }


  return (
    <div className="postSingle">
      <img src={props.info.image} alt="imagem-postada" />
      <p><b>{props.info.userName}</b>:{props.info.titulo}</p>
      <form onSubmit={e => comentar(props.id, e)}>
        <textarea id={'comentario-'+props.id}></textarea>
        <input type="submit" value="Comentar" />
      </form>
    </div>
  )
}

export default Post