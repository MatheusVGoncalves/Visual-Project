import React from 'react';
import { Button, Container } from 'react-bootstrap';
import { useNavigate } from 'react-router-dom';
import imagemMain from './img/home-bg.svg'
import './style.css'

function Home() {
    const history = useNavigate()

    function startCanva() {
        history('/canva')
    }

    return (
        <Container>
        <div className='home'>
            <div className='home-main'>
                <h1 className='home-title'>VISUAL <br/> PROJECT</h1>
                <div className='home-subtitle'>
                    <span>✔️ <strong>APRESENTE PROJETOS</strong> DE FORMA MAIS ASSERTIVA</span>
                    <span>✔️ É SIMPLES E <strong>SEM CADASTRO</strong>: CRIE, EDITE E <strong>SALVE EM PDF</strong></span>
                    <span>✔️ CRIE PROJETOS COM UMA METODOLOGIA RENOMADA: <strong>PM CANVA!</strong></span>
                </div>
                <Button className='home-btn' variant="light" size="lg" onClick={startCanva} >CRIE SEU CANVA</Button>
            </div>
            <div className='home-img'>
                <img src={imagemMain} /> 
            </div>
        </div>
        </Container>
    )
}

export default Home;