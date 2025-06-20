import '../styles/Salas.css';
import { SendHorizontal, LogOut, Search } from 'lucide-react';
import { useEffect, useState } from 'react';
import { Message } from '../components/Message';
import { UsersOnline } from '../components/UsersOnline';
import { useParams, useNavigate } from 'react-router-dom';

export default function SalaFront() {
  const { id: groupid } = useParams();
  const navigate = useNavigate();

  const [showSearch, setShowSearch] = useState(false);
  const [searchTerm, setSearchTerm] = useState('');
  const [mensagens, setMensagens] = useState([]);
  const [novaMensagem, setNovaMensagem] = useState('');
  const [salaNome, setSalaNome] = useState('Carregando...');

  const user = JSON.parse(localStorage.getItem('user'));
  const token = localStorage.getItem('token');

  useEffect(() => {
    async function carregarMensagens() {
      try {
        const res = await fetch(`http://localhost:3001/mensagens`);
        const data = await res.json();
        const msgsFiltradas = data.filter(m => m.groupid === parseInt(groupid));
        setMensagens(msgsFiltradas);
      } catch (err) {
        console.error('Erro ao carregar mensagens:', err);
      }
    }

    async function carregarSala() {
      try {
        const res = await fetch(`http://localhost:3001/salas`);
        const salas = await res.json();
        const sala = salas.find(s => s.id === parseInt(groupid));
        setSalaNome(sala?.name || 'Sala Desconhecida');
      } catch (err) {
        console.error('Erro ao buscar nome da sala:', err);
      }
    }

    carregarMensagens();
    carregarSala();
  }, [groupid]);

  const handleEnviar = async () => {
    if (!novaMensagem.trim()) return;

    const nova = {
      content: novaMensagem,
      groupid: parseInt(groupid),
      userid: user.id,
      user_name: user.name,
      user_profile_img: user.avatar_url || 'https://via.placeholder.com/40'
    };

    try {
      const res = await fetch('http://localhost:3001/mensagens', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token}`
        },
        body: JSON.stringify(nova)
      });

      const result = await res.json();
      setMensagens([...mensagens, result.data]);
      setNovaMensagem('');
    } catch (err) {
      console.error('Erro ao enviar mensagem:', err);
    }
  };

  const mensagensFiltradas = mensagens.filter(message =>
    message.content.toLowerCase().includes(searchTerm.toLowerCase()) ||
    message.user_name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const sair = () => {
    navigate('/dashboard');
  };

  return (
    <div className="chat-container">
      <div className="sidebar">
        <div className="sidebar-header">
          <h2>Membros Online</h2>
        </div>
        <div className="room-list">
          <UsersOnline nome="Thiago Gagliari" img="https://via.placeholder.com/40" />
          <UsersOnline nome="Julia Catapan" img="https://via.placeholder.com/40" />
          <UsersOnline nome="Jully Costa" img="https://via.placeholder.com/40" />
        </div>
      </div>

      <div className="main-chat">
        <div className="chat-header">
          <h2>Chat {salaNome}</h2>
          <a href="#" onClick={(e) => { e.preventDefault(); setShowSearch(!showSearch); }}><Search /></a>
          <a onClick={sair}><LogOut /></a>
        </div>

        {showSearch && (
          <div id="search-container" style={{ padding: 20 }}>
            <input
              type="text"
              placeholder="Pesquisar mensagens..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              style={{
                width: '100%',
                padding: '8px',
                borderRadius: '4px',
                border: '1px solid #ccc'
              }}
            />
          </div>
        )}

        <div className="message-container">
          {mensagensFiltradas.map(message => (
            <Message
              key={message.id}
              image={message.user_profile_img}
              author={message.user_name}
              content={message.content}
            />
          ))}
        </div>

        <div className="message-input">
          <input
            type="text"
            id="message"
            placeholder="Digite uma mensagem..."
            value={novaMensagem}
            onChange={(e) => setNovaMensagem(e.target.value)}
          />
          <button onClick={handleEnviar} className="send-message">
            <SendHorizontal />
          </button>
        </div>
      </div>
    </div>
  );
}
