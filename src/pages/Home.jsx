import LogoSemFundo from '../assets/logo-sem-fundo.png'
import ChatImagemFundo from '../assets/chat-image-fundo.png'
import Footer from '../components/Footer'
import '../styles/Home.css'
import React from 'react'
import { Link } from 'react-router-dom'

export default function Home(){
    return (
      <>
       <header className='home-header'>
            {/* <div className="home-header-container"> */}
                <img id='home-logo' src={LogoSemFundo} alt="GTChat Logo" />
              <div className="home-nav-buttons">
                <Link to='/login'>
                  <button className="home-btn-outline">Login</button>
                </Link>
                <Link to='/cadastro'>
                  <button className="home-btn-fill">Cadastre-se</button>
                </Link>
              </div>
            {/* </div> */}
          </header>

          <main className='home-main'>
            <div className="home-main-content">
              <div className="home-text-area">
                <h1><span>CHAT GT</span>:<br />Conecte-se com outros<br />Devs do <strong>Geração Tech</strong></h1>
                <p>O chat moderno para alunos do Geração Tech. Conecte-se com devs, compartilhe conhecimento e evolua em grupo. Participe de discussões, tire dúvidas e cresça com a comunidade.</p>
              </div>
              <div className="home-image-area">
                <img src={ChatImagemFundo} alt="Imagem do chat" />
              </div>
            </div>

          </main>
          <section className="home-features">
            <div className="home-container">
              <h2>Por que usar o GTChat?</h2>
              <div className="home-cards">
                <div className="home-card">
                  <h3>Conexão em tempo real</h3>
                  <p>Fale com outros alunos instantaneamente e troque experiências.</p>
                </div>
                <div className="home-card">
                  <h3>100% Gratuito</h3>
                  <p>Feito para todos os estudantes do Geração Tech sem nenhum custo.</p>
                </div>
                <div className="home-card">
                  <h3>Ambiente Colaborativo</h3>
                  <p>Ajude e aprenda com outros devs iniciantes como você.</p>
                </div>
              </div>
            </div>
          </section>

        
          <Footer/>
      </>
    )
}