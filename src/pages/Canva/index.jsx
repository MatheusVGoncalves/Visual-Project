import React, { useState, useEffect } from 'react';
import { Button, Container, Form } from 'react-bootstrap';
import { useForm } from 'react-hook-form'
import { useNavigate } from 'react-router-dom';
import PostIt from '../../components/PostIt';
import './style.css'

// Function LocalStorage

const setLocalStorage = (key, data) => localStorage.setItem(key, JSON.stringify(data))
const getLocalStorage = (key) => JSON.parse(localStorage.getItem(key)) ?? []

function Canva() {

    const { register, handleSubmit } = useForm();

    const [postTeste, setPostTeste] = useState(getLocalStorage("db_canva"))

    const key = 'db_canva';

    useEffect(() => {
        updateItens()
    }, [])

    useEffect(() => {
        console.log(postTeste)
    }, [postTeste])

    // Funtion CRUD

    const createItem = (item) => {
        let db_canva = [];
        db_canva = JSON.parse(localStorage.getItem('db_canva')) || [];
        db_canva.push(item)
        setLocalStorage(key, db_canva)
    }

    const updateItens = () => {
        const db_canva = getLocalStorage(key)
        setPostTeste(db_canva)
    }

    const deleteItem = (index) => {
        const db_canva = getLocalStorage(key);
        db_canva.splice(index, 1)
        setLocalStorage(key, db_canva)
    }

    // Function DOM

    function saveItem(e) {
        if (isValidFields()) {
            createItem(e)
            clearInput()
            updateItens()
        }
    }

    const editDelete = (event) => {

        if (event.target.type == 'submit') {

            const evento = event.target.dataset.action
            const index = event.target.dataset.index

            if (evento === 'editar') {
                console.log("editando")
                openEdit(index)

            } if (evento === 'deletar') {
                const data = getLocalStorage(key)[index]
                const response = confirm(`Deseja realmente excluir o item: "${data.descricao}"`)

                if (response) {
                    deleteItem(index)
                    updateItens()
                }

            }
        }
    }

    const updatePost = (index, post) => {
        const db_canva = getLocalStorage(key);
        db_canva[index] = post;
        setLocalStorage(key, db_canva)
    }

    // FUNCTION HELP

    const isValidFields = () => {
        return document.querySelector('form').reportValidity()
    }

    const clearInput = () => {
        const field = document.querySelector('#descricao')
        field.value = ''
    }

    const clearFields = () => {
        const rows = document.querySelectorAll('.campo div')
        rows.forEach(row => row.parentNode.removeChild(row))
    }

    const handleFilter = (base, areaPost) => {
        const areaFilter = areaPost;
        const db_canva = base;
        const local = db_canva.map(({ descricao, area, cor }, index) => (
            {
                descricao: descricao,
                area: area,
                cor: cor,
                id: index
            }
        ))
        const dbFilter = local.filter(({ area }) => area === areaFilter);
        return dbFilter;
    }

    const openEdit = (index) => {
        const text = document.querySelector(`#paragrafo-${index}`);
        const editText = document.querySelector(`#textarea-${index}`);
        const opcoes = document.querySelector(`#opcoes-${index}`);
        const edit = document.querySelector(`#editar-${index}`);

        text.classList.add('disable-text');
        editText.classList.remove('disable');
        editText.classList.add('enable');
        opcoes.classList.add('disable');
        edit.classList.add('enable');
    }

    const closeEdit = (index) => {
        const text = document.querySelector(`#paragrafo-${index}`);
        const editText = document.querySelector(`#textarea-${index}`);
        const opcoes = document.querySelector(`#opcoes-${index}`);
        const edit = document.querySelector(`#editar-${index}`);

        text.classList.remove('disable-text');
        editText.classList.add('disable');
        editText.classList.remove('enable');
        opcoes.classList.remove('disable');
        edit.classList.remove('enable');
    }

    const confirmEdit = (event) => {

        if (event.target.type == 'submit') {

            const evento = event.target.dataset.action
            const index = event.target.dataset.index

            if (evento === 'aceitar') {
                console.log("aceitou")
                const data = getLocalStorage(key)[index];
                const newDescription = document.querySelector(`#textarea-${index}`).value;
                if(newDescription === ""){
                    return alert("Insira um texto no Post IT! Ou caso prefira, você pode deletar clicando no seguinte ícone: ❌")
                }
                const newData = {
                    descricao: newDescription,
                    area: data.area,
                    cor: data.cor
                };
                updatePost(index, newData)
                updateItens()
                closeEdit(index)

            } if (evento === 'rejeitar') {
                console.log("rejeitou")
                const data = getLocalStorage(key)[index];
                const postText = document.querySelector(`#textarea-${index}`);
                postText.value = data;
                closeEdit(index)
            }
        }
    }

    // DATABASE

    let justificativa = handleFilter(postTeste, "justificativa");
    let objetivos = handleFilter(postTeste, "objetivos");
    let beneficios = handleFilter(postTeste, "beneficios");
    let produto = handleFilter(postTeste, "produto");
    let requisitos = handleFilter(postTeste, "requisitos");
    let stakeholders = handleFilter(postTeste, "stakeholders");
    let equipe = handleFilter(postTeste, "equipe");
    let premissas = handleFilter(postTeste, "premissas");
    let entregas = handleFilter(postTeste, "entregas");
    let restricoes = handleFilter(postTeste, "restricoes");
    let riscos = handleFilter(postTeste, "riscos");
    let tempo = handleFilter(postTeste, "tempo");
    let custo = handleFilter(postTeste, "custo");

    // PRINT

    const getPdf = () => {
        return window.print()
    }

    // CLEAN

    const cleanDB = () => {
        localStorage.removeItem(key)
        updateItens()
    }

    return (
        <>
            <Container>
                <div className="canva">
                    <div className="canva-form">
                        <form onSubmit={handleSubmit(saveItem)}>
                            <fieldset className='form-area'>
                                <div className="form-input">
                                    <legend>DESCRIÇÃO DO ITEM</legend>
                                    <textarea
                                        id="descricao"
                                        rows="1"
                                        placeholder="INSIRA O CONTEÚDO DO POST IT 📝"
                                        maxLength='140'
                                        {...register("descricao")}
                                        data-index="new"
                                        required></textarea>
                                </div>
                                <div className="form-input">
                                    <legend>ÁREA DO CANVAS</legend>
                                    <select id='area' {...register("area")}>
                                        <option value="justificativa" selected>JUSTIFICATIVA</option>
                                        <option value="objetivos"> OBJETIVO SMART</option>
                                        <option value="beneficios">BENEFÍCIOS</option>
                                        <option value="produto">PRODUTO</option>
                                        <option value="requisitos">REQUISITOS</option>
                                        <option value="stakeholders">STAKEHOLDERS</option>
                                        <option value="equipe">EQUIPE</option>
                                        <option value="premissas">PREMISSAS</option>
                                        <option value="entregas">ENTREGAS</option>
                                        <option value="restricoes">RESTRIÇÕES</option>
                                        <option value="riscos">RISCOS</option>
                                        <option value="tempo">LINHA DO TEMPO</option>
                                        <option value="custo">CUSTOS</option>
                                    </select>
                                </div>
                                <div className="form-input">
                                    <legend>COR DO ITEM</legend>
                                    <select id='cor' {...register("cor")}>
                                        <option value="azul" selected style={{ backgroundColor: '#42d3ff' }}>AZUL</option>
                                        <option value="verde" style={{ backgroundColor: '#00875f' }}>VERDE</option>
                                        <option value="vermelho" style={{ backgroundColor: '#e83f5b' }}>VERMELHO</option>
                                        <option value="laranja" style={{ backgroundColor: '#ff7a29' }}>LARANJA</option>
                                        <option value="roxo" style={{ backgroundColor: '#8257e5' }}>ROXO</option>
                                        <option value="cinza" style={{ backgroundColor: '#e1e1e6' }}>CINZA</option>
                                    </select>
                                </div>
                                <div className="form-input">
                                    <Button variant='success' id='save' type='submit'>INSERIR</Button>
                                </div>
                            </fieldset>
                        </form>
                    </div>

                    <div className="canva-app">
                        <div className="canva-campo justificativa">
                            <div className="canva-title">
                                <h1>💬 JUSTIFICATIVA</h1>
                            </div>
                            <div className='campo canva-justificativa'>
                                {justificativa.map(({ descricao, area, cor, id }) => (
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
                                )
                                )
                                }
                            </div>
                        </div>
                        <div className="canva-campo objetivos">
                            <div className="canva-title">
                                <h1>🎯 OBJETIVOS SMART</h1>
                            </div>
                            <div className='campo canva-objetivos'>
                            {objetivos.map(({ descricao, area, cor, id }) => (
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
                                )
                                )
                                }
                            </div>
                        </div>
                        <div className="canva-campo beneficios">
                            <div className="canva-title">
                                <h1>📈 BENEFÍCIOS</h1>
                            </div>
                            <div className='campo canva-beneficios'>
                            {beneficios.map(({ descricao, area, cor, id }) => (
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
                                )
                                )
                                }
                            </div>
                        </div>
                        <div className="canva-campo produto">
                            <div className="canva-title">
                                <h1>📦 PRODUTO</h1>
                            </div>
                            <div className='campo canva-produto'>
                            {produto.map(({ descricao, area, cor, id }) => (
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
                                )
                                )
                                }
                            </div>
                        </div>
                        <div className="canva-campo requisitos">
                            <div className="canva-title">
                                <h1>📝 REQUISITOS</h1>
                            </div>
                            <div className='campo canva-requisitos'>
                            {requisitos.map(({ descricao, area, cor, id }) => (
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
                                )
                                )
                                }
                            </div>
                        </div>
                        <div className="canva-campo stakeholders">
                            <div className="canva-title">
                                <h1 id='textMin'>🏦 STAKEHOLDERS EXTERNOS</h1>
                            </div>
                            <div className='campo canva-stakeholders'>
                            {stakeholders.map(({ descricao, area, cor, id }) => (
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
                                )
                                )
                                }
                            </div>
                        </div>
                        <div className="canva-campo equipe">
                            <div className="canva-title">
                                <h1>👨‍💻 EQUIPE</h1>
                            </div>
                            <div className='campo canva-equipe'>
                            {equipe.map(({ descricao, area, cor, id }) => (
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
                                )
                                )
                                }
                            </div>
                        </div>
                        <div className="canva-campo premissas">
                            <div className="canva-title">
                                <h1>☁️ PREMISSAS</h1>
                            </div>
                            <div className='campo canva-premissas'>
                            {premissas.map(({ descricao, area, cor, id }) => (
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
                                )
                                )
                                }
                            </div>
                        </div>
                        <div className="canva-campo entregas">
                            <div className="canva-title">
                                <h1>🚚 GRUPO DE ENTREGAS</h1>
                            </div>
                            <div className='campo canva-entregas'>
                            {entregas.map(({ descricao, area, cor, id }) => (
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
                                )
                                )
                                }
                            </div>
                        </div>
                        <div className="canva-campo restricoes">
                            <div className="canva-title">
                                <h1>🚫 RESTRIÇÕES</h1>
                            </div>
                            <div className='campo canva-restricoes'>
                            {restricoes.map(({ descricao, area, cor, id }) => (
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
                                )
                                )
                                }
                            </div>
                        </div>
                        <div className="canva-campo riscos">
                            <div className="canva-title">
                                <h1>💣 RISCOS</h1>
                            </div>
                            <div className='campo canva-riscos'>
                            {riscos.map(({ descricao, area, cor, id }) => (
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
                                )
                                )
                                }
                            </div>
                        </div>
                        <div className="canva-campo tempo">
                            <div className="canva-title">
                                <h1>⏳ LINHA DO TEMPO</h1>
                            </div>
                            <div className='campo canva-tempo'>
                            {tempo.map(({ descricao, area, cor, id }) => (
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
                                )
                                )
                                }
                            </div>
                        </div>
                        <div className="canva-campo custo">
                            <div className="canva-title">
                                <h1>💰 CUSTOS</h1>
                            </div>
                            <div className='campo canva-custo'>
                            {custo.map(({ descricao, area, cor, id }) => (
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
                                )
                                )
                                }
                            </div>
                        </div>
                    </div>
                    <div className="canva-download">
                        <Button variant='danger' onClick={getPdf}>BAIXAR EM PDF 📥</Button>
                    </div>
                    <div className="canva-clean">
                        <Button variant='primary' onClick={cleanDB}>LIMPAR BLOCOS 🧹</Button>
                    </div>
                </div>
            </Container>
        </>
    )
}

export default Canva