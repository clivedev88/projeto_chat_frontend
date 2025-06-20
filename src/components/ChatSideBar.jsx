import ImagemThiago from '../assets/profile.png'
import ImagemNone from '../assets/none.png'
import { UsersOnline } from '../components/UsersOnline';

export const ChatSideBar = () => {
    const usersOnlineLista = [
          {
              id: 1,
              nome: "Thiago Gagliari",
              img: ImagemThiago
          },
          {
              id: 2,
              nome: "Julia Catapan",
              img: ImagemNone
          },
          {
              id: 3,
              nome: "Jully Costa",
              img: ImagemNone
          },
          {
              id: 4,
              nome: "Rafael ",
              img: ImagemNone
          }
    ]

    return ( 
        <div className="sidebar">
            <div className="sidebar-header">
              <h2>Membros Online</h2>
            </div>

            <div className="room-list">
              {usersOnlineLista.map(user => (
                <UsersOnline
                  key={user.id}
                  nome={user.nome}
                  img={user.img}
                />
              ))}
            </div>
        </div>
     );
}