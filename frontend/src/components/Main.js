import React from 'react';
import Card from './Card.js';
import { CurrentUserContext } from '../contexts/CurrentUserContext.js';

function Main(props) {
  const currentUser = React.useContext(CurrentUserContext);

  return (
    <main className="content">
      <section className="profile">
        <div className="profile__photo-container">
          <img className="profile__photo" src={currentUser.avatar} alt={currentUser.name} />
          <div className="profile__avatar-edit-button" onClick={props.onEditAvatar}></div>
        </div>
        <div className="profile__info">
          <div className="profile__info-main">
            <h1 className="profile__title">{currentUser.name}</h1>
            <button className="profile__edit-button" type="button" aria-label="Редактировать"
              onClick={props.onEditProfile}></button>
          </div>
          <p className="profile__subtitle">{currentUser.about}</p>
        </div>
        <button className="profile__add-button" type="button" aria-label="Добавить"
          onClick={props.onAddPlace}></button>
      </section>
      <section className="places">
      
        {props.cards.map((data) => (
          <Card
            card={data}
            key={data._id}
            name={data.name}
            link={data.link}
            likes={data.likes}
            onCardClick={props.onCardClick}
            onCardLike={props.onCardLike}
            onCardDelete={props.onCardDelete} />
        ))}
  
      </section>
    </main>
  )
}

export default Main;