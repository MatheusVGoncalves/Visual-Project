const key = 'db_canva';

const getLocalStorage = (key) => JSON.parse(localStorage.getItem(key)) ?? []

const setLocalStorage = (key, data) => localStorage.setItem(key, JSON.stringify(data))

const createItem = (item) => {
    const db_canva =  getLocalStorage(key)
    db_canva.push(item)
    setLocalStorage(key, db_canva)
} 

const updateItem = (index, item) => {
    const db_canva = getLocalStorage(key);
    db_canva[index].descricao = item.descricao;
    setLocalStorage(key, db_canva)
}

const deleteItem = (index) => {
    const db_canva = getLocalStorage(key);
    db_canva.splice(index, 1)
    setLocalStorage(key, db_canva)
}

const isValidFields = () => {
    return document.querySelector('form').reportValidity()
}

const clearField = () => {
    const field = document.querySelector('#descricao')
    field.value = ''
}

const updateCampo = () => {
    const db_canva = getLocalStorage(key)
    clearCampo()
    db_canva.forEach(createPostIt)
}

const clearCampo = () => {
    const rows = document.querySelectorAll('.canva-campo div')
    rows.forEach(row => row.parentNode.removeChild(row))
}

const savePost = () => {
    if(isValidFields()){
        const post = {
            descricao: document.getElementById('descricao').value,
            area: document.getElementById('area').value,
            cor: document.getElementById('cor').value
        }

        const index = document.getElementById('descricao').dataset.index

        if(index == 'new') {
        createItem(post)
        updateCampo()
        } else {
            updateItem(index, post)
            updateCampo()
        }
        
    }
}


const createPostIt = (item, index) => {
    const newPostIt = document.createElement('div');
    const areaPost = document.querySelector(`.${item.area}`)
    

    newPostIt.classList.add('postIt');
    newPostIt.classList.add(item.cor);

    newPostIt.innerHTML = `
    <p>${item.descricao}</p>
    <textarea class='editar-texto'>${item.descricao}</textarea>
    <div class="opcoes">
        <button class='editar'>✍️</button>
        <button class='excluir'>⛔</button>
    </div>
    <div class="opcoes-editar">
        <button class='aprovar'>✔️</button>
        <button class='rejeitar'>❌</button>
    </div>
    `
    areaPost.appendChild(newPostIt);
}

updateCampo();

function save() {
   const button = document.getElementById('save')

    button.addEventListener('click', savePost)
}




/*************************************************************************************************** */


function Canva() {

    const { register, handleSubmit } = useForm()

    const key = 'db_canva';

    const [descricao, setDescricao] = useState()
    const [area, setArea] = useState('justificativa')
    const [cor, setCor] = useState('azul')

    useEffect(() => {
        updateItens()
    }, [])

    // Function LocalStorage

    const setLocalStorage = (key, data) => localStorage.setItem(key, JSON.stringify(data))
    const getLocalStorage = (key) => JSON.parse(localStorage.getItem(key)) ?? []


    // Funtion CRUD

    const createItem = (item) => {
        const db_canva =  getLocalStorage(key)
        db_canva.push(item)
        setLocalStorage(key, db_canva)
    } 
    
    function saveItem () {

        if(isValidFields()) {

        const post = {
            descricao: descricao,
            area: area,
            cor: cor
        }

        createItem(post)
        clearInput()
        updateItens()
    }
    }

    const updateItens = () => {
        const db_canva =  getLocalStorage(key)
        clearFields()
        db_canva.forEach(createPostIt)
    }

    // Function DOM

    const createPostIt = (item, index) => {
        const newPostIt = document.createElement('div');
        const areaPost = document.querySelector(`.canva-${item.area}`)
        newPostIt.classList.add('postIt', item.cor);
    
        newPostIt.innerHTML = `
        <p>${item.descricao}</p>
        <textarea class='editar-texto'>${item.descricao}</textarea>
        <div class="opcoes">
            <button class='editar' data-index='${index}'>✍️</button>
            <button class='excluir' data-index='${index}'>⛔</button>
        </div>
        <div class="opcoes-editar">
            <button class='aprovar' data-index='${index}'>✔️</button>
            <button class='rejeitar' data-index='${index}'>❌</button>
        </div>
        `
        areaPost.appendChild(newPostIt);
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
    


    return (
        <>
            <Container>
                <div className="canva">

                    <div className="canva-form">
                        <form>
                            <fieldset className='form-area'>
                                <div className="form-input">
                                    <legend>DESCRIÇÃO DO ITEM</legend>
                                    <textarea 
                                    name="descricao" 
                                    id="descricao" 
                                    rows="1" 
                                    placeholder="INSIRA O CONTEÚDO DO POST IT 📝" 
                                    maxLength='140' 
                                    value={descricao} 
                                    onChange={e => setDescricao(e.target.value)} 
                                    data-index="new" 
                                    
                                    required></textarea>
                                </div>
                                <div className="form-input">
                                    <legend>ÁREA DO CANVAS</legend>
                                    <select name="area" id='area' value={area} onChange={ e => setArea(e.target.value)}>
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
                                    <select name="cor" id='cor' value={cor} onChange={e => setCor(e.target.value)}>
                                        <option value="azul" selected style={{ backgroundColor: '#42d3ff' }}>AZUL</option>
                                        <option value="verde" style={{ backgroundColor: '#00875f' }}>VERDE</option>
                                        <option value="vermelho" style={{ backgroundColor: '#e83f5b' }}>VERMELHO</option>
                                        <option value="laranja" style={{ backgroundColor: '#ff7a29' }}>LARANJA</option>
                                        <option value="roxo" style={{ backgroundColor: '#8257e5' }}>ROXO</option>
                                        <option value="cinza" style={{ backgroundColor: '#e1e1e6' }}>CINZA</option>
                                    </select>
                                </div>
                                <div className="form-input">
                                    <Button variant='success' id='save' onClick={saveItem}>INSERIR</Button>
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
                                <div className="postIt">
                                    <p>Alta demanda em diversos períodos do ano</p>
                                    <textarea className='editar-texto'>Alta demanda por varios itens a procura</textarea>
                                    <div className="opcoes">
                                        <button className='editar'>✍️</button>
                                        <button className='excluir'>⛔</button>
                                    </div>
                                    <div className="opcoes-editar">
                                        <button className='aprovar'>✔️</button>
                                        <button className='rejeitar'>❌</button>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div className="canva-campo objetivos">
                            <div className="canva-title">
                                <h1>🎯 OBJETIVOS SMART</h1>
                            </div>
                            <div className='campo canva-objetivos'>

                            </div>
                        </div>
                        <div className="canva-campo beneficios">
                            <div className="canva-title">
                                <h1>📈 BENEFÍCIOS</h1>
                            </div>
                            <div className='campo canva-beneficios'>

                            </div>
                        </div>
                        <div className="canva-campo produto">
                            <div className="canva-title">
                                <h1>📦 PRODUTO</h1>
                            </div>
                            <div className='campo canva-produto'>

                            </div>
                        </div>
                        <div className="canva-campo requisitos">
                            <div className="canva-title">
                                <h1>📝 REQUISITOS</h1>
                            </div>
                            <div className='campo canva-requisitos'>

                            </div>
                        </div>
                        <div className="canva-campo stakeholders">
                            <div className="canva-title">
                                <h1>🏦 STAKEHOLDERS EXTERNOS</h1>
                            </div>
                            <div className='campo canva-stakeholders'>

                            </div>
                        </div>
                        <div className="canva-campo equipe">
                            <div className="canva-title">
                                <h1>👨‍💻 EQUIPE</h1>
                            </div>
                            <div className='campo canva-equipe'>

                            </div>
                        </div>
                        <div className="canva-campo premissas">
                            <div className="canva-title">
                                <h1>☁️ PREMISSAS</h1>
                            </div>
                            <div className='campo canva-premissas'>

                            </div>
                        </div>
                        <div className="canva-campo entregas">
                            <div className="canva-title">
                                <h1>🚚 GRUPO DE ENTREGAS</h1>
                            </div>
                            <div className='campo canva-entregas'>

                            </div>
                        </div>
                        <div className="canva-campo restricoes">
                            <div className="canva-title">
                                <h1>🚫 RESTRIÇÕES</h1>
                            </div>
                            <div className='campo canva-restricoes'>

                            </div>
                        </div>
                        <div className="canva-campo riscos">
                            <div className="canva-title">
                                <h1>💣 RISCOS</h1>
                            </div>
                            <div className='campo canva-riscos'>

                            </div>
                        </div>
                        <div className="canva-campo tempo">
                            <div className="canva-title">
                                <h1>⏳ LINHA DO TEMPO</h1>
                            </div>
                            <div className='campo canva-tempo'>

                            </div>
                        </div>
                        <div className="canva-campo custo">
                            <div className="canva-title">
                                <h1>💰 CUSTOS</h1>
                            </div>
                            <div className='campo canva-custo'>

                            </div>
                        </div>
                    </div>
                    <div className="canva-download">
                        <Button variant='danger'>BAIXAR EM PDF 📥</Button>
                    </div>
                </div>


            </Container>
        </>
    )
}

export default Canva