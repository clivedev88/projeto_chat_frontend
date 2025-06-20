import { UsersRound } from 'lucide-react';
import { Link } from 'react-router-dom';

export const DashboardCard = ({ nome, img, totalOnline, rota }) => {
  return (
    <div className="dashboard-card">
      <h2 className='dashboard-texto'>Sala {nome}</h2>
      <img src={img} alt={`Imagem da sala ${nome}`} />
      <p className='dashboard-paragrafo'>Membros Online:</p>
      <div className='dashboard-membros-online'>
        <UsersRound />
        <p>{totalOnline} Pessoas</p>
      </div>
      <Link to={rota}>
        <button className='dashboard-card-btn'>Entrar</button>
      </Link>
    </div>
  );
};
