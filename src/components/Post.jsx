/* *
 * Arquivo: Post.jsx
 * Descrição: Arquivos do componente Post e sua lógica
 * Author: Rafael Cavalcante
 * Data de criação: 14/08/2021
 */
import { useState, useEffect } from 'react';
import { db } from '../firebase';

const Post = (props) => {
  const [comentarios, setComentarios] = useState([]);

  useEffect(() => {
    db.collection('posts').doc(props.id).collection('comentarios').onSnapshot((snapshot) => {
      setComentarios(snapshot.docs.map((document) => ({
        id: document.id,
        info: document.data(),
      })));
    });
  }, []);

  const comentar = (id, e) => {
    e.preventDefault();

    const comentarioAtual = document.querySelector(`#comentario-${id}`).value;

    db.collection('posts').doc(id).collection('comentarios').add({
      nome: props.user,
      comentario: comentarioAtual,
    });

    document.querySelector(`#comentario-${id}`).value = '';
  };

  return (
    <div className="postSingle">
      <img src={props.info.image} alt="imagem-postada" />
      <p>
        <b>{props.info.userName}</b>
        :
        {props.info.titulo}
      </p>
      <div className="coments">
        {
          comentarios.map((val) => (
            <div className="coment-single">
              <p>
                <b>{val.info.nome}</b>
                :
                {' '}
                {val.info.comentario}
              </p>
            </div>
          ))
        }
      </div>
      <form onSubmit={(e) => comentar(props.id, e)}>
        <textarea id={`comentario-${props.id}`} />
        <input type="submit" value="Comentar" />
      </form>
    </div>
  );
};

export default Post;
