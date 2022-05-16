import { Container } from 'react-bootstrap';
import orientacao from './img/instrucao.png'
import './style.css'

function Orientacao() {
    return(
    <>
            <Container>
                <div className="introducao">
                    <h1>COMO UTILIZAR 👇🏻</h1>
                    <span className='textoInstrucao'>✔️ PREENCHA O CANVA ATRAVÉS DO <strong>FORMULÁRIO SUPERIOR</strong>, PODENDO UTILIZAR O <strong>MATERIAL DE APOIO</strong> PARA ENTENDER CADA CAMPO!</span>
                    <span className='textoInstrucao'>✔️ APÓS O PREENCHIMENTO, CLIQUE NO BOTÃO <strong>"BAIXAR EM PDF"</strong> </span>
                    <span className='textoInstrucao'>✔️ PARA LIMPAR O CANVA E CRIAR NOVAMENTE, UTILIZE O BOTÃO <strong>"LIMPAR BLOCOS"</strong></span>
                </div>
                <div className="instrucao">
                    <img src={orientacao} alt="Instrução de Preenchimento da Ferramenta" width='100%' />
                </div>
            </Container>
        </>
        )
}

export default Orientacao;