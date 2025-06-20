import ImagemThiago from '../assets/profile.png'
import ImagemNone from '../assets/none.png'

export const UsersOnline = ({nome, img}) => {
    return ( 
        <div className="room-item">
            <img src={img} alt="html" />
            <span>{nome}</span>
        </div>   
     );
}