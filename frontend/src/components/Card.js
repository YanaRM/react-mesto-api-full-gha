import React from 'react';
import { CurrentUserContext } from '../contexts/CurrentUserContext';

function Card(props) {
  const currentUser = React.useContext(CurrentUserContext);
  const isOwn = props.card.owner === currentUser._id;
  const isLiked = props.card.likes.some(i => i === currentUser._id);
  const cardLikeButtonClassName = ( 
    `place__like-button ${isLiked && 'place__like-button_active'}` 
  );

  function handleClick() {
    props.onCardClick(props.card);
  }

  function handleDeleteClick() {
    props.onCardDelete(props.card);
  }

  function handleLikeClick() {
    props.onCardLike(props.card);
  }
  
  return (
    <div className="place">
      <img className="place__image" src={`${props.link}`} alt={props.name}
        onClick={handleClick} />
      <div className="place__title-container">
        <h2 className="place__title">{props.name}</h2>
        <div className="place__like">
          <button className={cardLikeButtonClassName} type="button" aria-label="Нравится"
            onClick={handleLikeClick}></button>
          <p className="place__like-counter">{props.likes.length}</p>
        </div>
      </div>
      {isOwn && <button className="place__remove-button" type="button"
        aria-label="Удалить" onClick={handleDeleteClick}></button>}
    </div>
  )
}

export default Card;