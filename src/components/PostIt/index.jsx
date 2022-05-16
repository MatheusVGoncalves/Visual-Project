import { useEffect } from "react";

const PostIt = (props) => {

    const data = props.data;

    const id = data.id;
    const descricao = data.descricao;
    const cor = data.cor;


    return (
        <>
            <div className={`postIt ${cor}`}>
                <p id={`paragrafo-${id}`}>{descricao}</p>
                <textarea class='editar-texto disable' id={`textarea-${id}`} required>{descricao}</textarea>
                <div class="opcoes" id={`opcoes-${id}`}>
                    <button class='editar' onClick={editDelete} data-action='editar' data-index={id}>✍️</button>
                    <button class='excluir' onClick={editDelete} data-action='deletar' data-index={id}>⛔</button>
                </div>
                <div class="opcoes-editar disable" id={`editar-${id}`}>
                    <button class='aprovar' onClick={confirmEdit} data-action='aceitar' data-index={id}>✔️</button>
                    <button class='rejeitar' onClick={confirmEdit} data-action='rejeitar' data-index={id}>❌</button>
                </div>
            </div>
        </>
    )
}

export default PostIt;