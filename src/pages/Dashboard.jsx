import '../styles/Dashboard.css';
import LogoSemFundo from '../assets/logo-sem-fundo.png';
import FrontEndImage from '../assets/frontend.jpg';
import BackEndImage from '../assets/backend.jpg';
import ProjectImage from '../assets/projects.jpg';
import Footer from '../components/Footer';
import { LogOut } from 'lucide-react';
import { Link, useNavigate } from 'react-router-dom';
import { DashboardCard } from '../components/DashboardCard';
import { useEffect, useState } from 'react';

export default function Dashboard() {
  const [salas, setSalas] = useState([]);
  const navigate = useNavigate();

  const imagensPorNome = {
    'Frontend': FrontEndImage,
    'Backend': BackEndImage,
    'Projetos': ProjectImage
  };

  useEffect(() => {
    async function buscarSalas() {
      try {
        const res = await fetch('http://localhost:3001/salas');
        const data = await res.json();
        setSalas(data);
      } catch (error) {
        console.error('Erro ao buscar salas:', error);
      }
    }

    buscarSalas();
  }, []);

  function dashboardLogout() {
    localStorage.removeItem('token');
    localStorage.removeItem('user');
    navigate('/login');
  }

  return (
    <>
      <header id="cabecalho">
        <Link to='/'>
          <img src={LogoSemFundo} alt="logo" />
        </Link>
        <h1>Salas Disponíveis</h1>
        <div className="dropdown">
            <a onClick={dashboardLogout}><LogOut /></a>
            <div className="dropdown-content">
              <p>Logout</p>
            </div>
          </div>
      </header>

      <div className="dashboard-container">
        {salas.map((sala) => (
          <DashboardCard
            key={sala.id}
            nome={sala.name}
            img={imagensPorNome[sala.name] || ProjectImage}
            totalOnline={0}
            rota={`/salas/${sala.id}`}
          />
        ))}
      </div>

      <Footer />
    </>
  );
}
