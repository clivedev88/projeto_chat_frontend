import '../styles/Cadastro.css';
import LogoSemFundo from '../assets/logo-sem-fundo.png';
import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';

export default function Cadastro() {
  const [errorMessage, setErrorMessage] = useState('');
  const [typeSenha, setSenha] = useState(false);
  const navigate = useNavigate();

  function mudarTipo() {
    setSenha(!typeSenha);
  }

  function DataMax() {
    const dataAtual = new Date();
    const ano = dataAtual.getFullYear();
    const mes = String(dataAtual.getMonth() + 1).padStart(2, '0');
    const dia = String(dataAtual.getDate()).padStart(2, '0');
    document.getElementById('data-nascimento').max = `${ano}-${mes}-${dia}`;
  }

  function handleKeyDown(e) {
    const inputLength = e.target.value.length;
    if (e.key !== 'Backspace' && inputLength === 3 || inputLength === 7) {
      e.target.value += '.';
    } else if (e.key !== 'Backspace' && inputLength === 11) {
      e.target.value += '-';
    }
  }

  async function cadastrar() {
    const nome = document.getElementById("nome").value;
    const dataNascimento = document.getElementById("data-nascimento").value;
    const cpf = document.getElementById("cpf").value;
    const email = document.getElementById("email").value;
    const senha = document.getElementById("password").value;

    if (!nome || !dataNascimento || !cpf || !email || !senha) {
      setErrorMessage("Por favor, preencha todos os campos.");
      return;
    }

    try {
      const res = await fetch('http://localhost:3001/register', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          name: nome,
          email: email,
          password: senha,
          avatar_url: 'https://via.placeholder.com/40'
        })
      });

      const result = await res.json();

      if (!res.ok) {
        setErrorMessage(result.message || 'Erro ao cadastrar');
        return;
      }

      localStorage.setItem('token', result.token);
      localStorage.setItem('user', JSON.stringify(result.user));

      navigate('/login');
    } catch (err) {
      console.error(err);
      setErrorMessage('Erro ao conectar com o servidor.');
    }
  }

  return (
    <div className="cadastro-body" onLoad={DataMax}>
      <div className="cadastro-container">
        <Link to='/'>
          <img src={LogoSemFundo} alt="logo do GT Chat" id="cadastro-logo-icone" />
        </Link>
        <h1>Cadastrar conta</h1>

        <form className='cadastro-form'>
          <div className="cadastro-grupo-inputs">
            <input type="text" placeholder="Nome" id="nome" className='cadastro-input' required />
          </div>

          <div className="cadastro-grupo-inputs">
            <input
              placeholder="Data de nascimento"
              type="text"
              onFocus={(e) => e.target.type = 'date'}
              onBlur={(e) => e.target.type = 'text'}
              name="data-nascimento"
              id="data-nascimento"
              className='cadastro-input'
              required
            />
          </div>

          <div className="cadastro-grupo-inputs">
            <input
              type="text"
              placeholder="CPF"
              id="cpf"
              className='cadastro-input'
              onKeyDown={handleKeyDown}
              onInput={(e) => e.target.value = e.target.value.replace(/[^0-9.-]/g, '')}
              minLength="14"
              maxLength="14"
              required
            />
          </div>

          <div className="cadastro-grupo-inputs">
            <input type="email" placeholder="E-mail" id="email" className='cadastro-input' required />
          </div>

          <div className="cadastro-grupo-inputs">
            <div className="cadastro-password-container">
              <input
                type={typeSenha ? 'text' : 'password'}
                placeholder="Senha"
                id="password"
                className='cadastro-input'
                required
              />
              <i className={typeSenha ? 'fas fa-eye-slash fa-lg' : 'fas fa-eye fa-lg'} id="togglePassword" onClick={mudarTipo}></i>
            </div>
          </div>

          <button type="button" onClick={cadastrar}>Criar conta</button>
        </form>

        {errorMessage && <p className='cadastro-input-error'>{errorMessage}</p>}
      </div>

      <div className="cadastro-possui-conta">
        <p>Já tem uma conta? <Link to="/login">Fazer login</Link></p>
      </div>
    </div>
  );
}
