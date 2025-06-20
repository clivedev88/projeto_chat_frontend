export const Message = ({image, author, content}) => {
    return ( 
        <div className="container-message">
          <img src={image} alt="" />
          <div className="message-bubble">
            <span>{author}</span>
            <p>{content}</p>
          </div>
        </div>
              
     );
}