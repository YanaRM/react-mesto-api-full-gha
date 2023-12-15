import React, { useEffect, useState } from 'react';
import { Routes, Route, useNavigate, Link } from 'react-router-dom';
import Header from './Header.js';
import Main from './Main.js';
import Footer from './Footer.js';
import PopupWithForm from './PopupWithForm.js';
import ImagePopup from './ImagePopup.js';
import api from '../utils/Api.js';
import { CurrentUserContext } from '../contexts/CurrentUserContext.js';
import EditProfilePopup from './EditProfilePopup.js';
import EditAvatarPopup from './EditAvatarPopup.js';
import AddPlacePopup from './AddPlacePopup.js';
import ProtectedRouteElement from './ProtectedRoute.js';
import Login from './Login.js';
import Register from './Register.js';
import * as mestoAuth from '../utils/mestoAuth.js';
import InfoTooltip from './InfoTooltip.js';
import SuccessPicture from '../images/success-sign.svg';
import FailurePicture from '../images/failure-sign.svg';

function App() {
  const [isEditAvatarPopupOpen, setIsEditAvatarPopupOpen] = useState(false);
  const [isEditProfilePopupOpen, setIsEditProfilePopupOpen] = useState(false);
  const [isAddPlacePopupOpen, setIsAddPlacePopupOpen] = useState(false);
  const [isImagePopupOpen, setIsImagePopupOpen] = useState(false);
  const [selectedCard, setSelectedCard] = useState({});
  const [currentUser, setCurrentUser] = useState({});
  const [cards, setCards] = useState([]);
  const [loggedIn, setLoggedIn] = useState(false);
  const [userEmail, setUserEmail] = useState('');
  const [isInfoTooltipOpen, setIsInfoTooltipOpen] = useState(false);
  const [picture, setPicture] = useState();
  const [message, setMessage] = useState();

  const navigate = useNavigate();

  const handleEditAvatarClick = () => {
    setIsEditAvatarPopupOpen(true);
  }

  const handleEditProfileClick = () => {
    setIsEditProfilePopupOpen(true);
  }

  const handleAddPlaceClick = () => {
    setIsAddPlacePopupOpen(true);
  }

  const handleCardClick = (data) => {
    setSelectedCard({name: data.name, link: data.link})
    setIsImagePopupOpen(true);
  }

  function handleCardLike(card) {
    const isLiked = card.likes.some(i => i === currentUser._id);

    api.putLike(card._id, localStorage.getItem('jwt'), !isLiked)
      .then((newCard) => {
        setCards((state) => state.map((c) => c._id === card._id ? newCard : c));
      })
      .catch((err) => {
        console.log(err)
      })
    
    api.removeLike(card._id, localStorage.getItem('jwt'), isLiked)
      .then((newCard) => {
        setCards((state) => state.map((c) => c._id === card._id ? newCard : c));
      })
      .catch((err) => {
        console.log(err)
      })
  }

  function handleCardDelete(card) {
    api.deleteCard(card._id, localStorage.getItem('jwt'))
      .then(() => {
        setCards((state) => state.filter((c) => c._id !== card._id))
      })
      .catch((err) => {
        console.log(err)
      })
  }

  function closeAllPopups() {
    setIsEditAvatarPopupOpen(false);
    setIsEditProfilePopupOpen(false);
    setIsAddPlacePopupOpen(false);
    setIsImagePopupOpen(false);
    setIsInfoTooltipOpen(false);
  }

  useEffect(() => {
    if (loggedIn) {
      api.getUserData(localStorage.getItem('jwt'))
        .then((data) => {
          setCurrentUser(data)
        })
        .catch((err) => {
          console.log(err)
        })

      api.getInitialCards(localStorage.getItem('jwt'))
        .then((data) => {
          setCards(data);
          console.log(data)
        })
        .catch((err) => {
          console.log(err)
        })
    }
  }, [loggedIn])

  useEffect(() => {
    tokenCheck();
  }, []);

  function handleUpdateUser(data) {
    api.editProfile(data, localStorage.getItem('jwt'))
      .then((data) => {
        setCurrentUser(data);
        closeAllPopups()
      })
      .catch((err) => {
        console.log(err)
      })
  }

  function handleUpdateAvatar(data) {
    api.editAvatar(data, localStorage.getItem('jwt'))
      .then((data) => {
        setCurrentUser(data);
        closeAllPopups()
      })
      .catch((err) => {
        console.log(err)
      })
  }

  function handleAddPlaceSubmit(data) {
    api.addNewCard(data, localStorage.getItem('jwt'))
      .then((newCard) => {
        setCards([newCard, ...cards]);
        closeAllPopups()
      })
      .catch((err) => {
        console.log(err)
      })
  }

  function handleRegister(data) {
    mestoAuth.register(data)
      .then(() => {
        setPicture(SuccessPicture);
        setMessage('Вы успешно зарегистрировались!');
        setIsInfoTooltipOpen(true);

        navigate('/sign-in', {replace: true});
      })
      .catch((err) => {
        setPicture(FailurePicture);
        setMessage('Что-то пошло не так! Попробуйте ещё раз.');
        setIsInfoTooltipOpen(true);

        console.log(err)
      });
  }

  function handleLogin(data) {
    mestoAuth.authorize(data)
      .then((res) => {
        if (res.token) {
          setLoggedIn(true);
          localStorage.setItem('jwt', res.token);
          tokenCheck();

          navigate('/', {replace: true})
        }
      })
      .catch(() => {
        setPicture(FailurePicture);
        setMessage('Что-то пошло не так! Попробуйте ещё раз.');
        setIsInfoTooltipOpen(true);
      });
  }
  
  function tokenCheck() {
    const jwt = localStorage.getItem('jwt');
    if (jwt) {
      mestoAuth.checkToken(jwt)
        .then((res) => {
          if (res) {
            setUserEmail(res.email);
          
            setLoggedIn(true);
            navigate('/', {replace: true})
          }
        })
        .catch(err => console.log(err))
    }
  }

  function signOut() {
    setLoggedIn(false);
    localStorage.removeItem('jwt');
    navigate('/', {replace: true})
  }

  return (
    <CurrentUserContext.Provider value={currentUser}>
      <div className="page">
        <Routes>
          <Route path="/" element={<ProtectedRouteElement element={Header}
            loggedIn={loggedIn}
            userEmail={userEmail}
            children={<button className="header__exit-button"
            type="button" aria-label="Выйти"
            onClick={signOut}>Выйти</button>}
          />} />
          <Route path="/sign-in" element={<Header
            children={<Link className="header__link" to="/sign-up">Регистрация</Link>} />} />
          <Route path="/sign-up" element={<Header
            children={<Link className="header__link" to="/sign-in">Войти</Link>} />} />
        </Routes>
        <Routes>
          <Route path="/" element={<ProtectedRouteElement element={Main}
            loggedIn={loggedIn}
            onEditAvatar={handleEditAvatarClick}
            onEditProfile={handleEditProfileClick}
            onAddPlace={handleAddPlaceClick}
            cards={cards}
            onCardClick={handleCardClick}
            onCardLike={handleCardLike}
            onCardDelete={handleCardDelete}
          />} />
          <Route path="/sign-in" element={<Login handleLogin={handleLogin} />} />
          <Route path="/sign-up" element={<Register linkTo={"/sign-in"} handleRegister={handleRegister} />} />
        </Routes>
        <Footer />
        <EditProfilePopup
          isOpen={isEditProfilePopupOpen}
          onClose={closeAllPopups}
          onUpdateUser={handleUpdateUser} />
        <AddPlacePopup
          isOpen={isAddPlacePopupOpen}
          onClose={closeAllPopups}
          onAddPlace={handleAddPlaceSubmit} />
        <EditAvatarPopup
          isOpen={isEditAvatarPopupOpen}
          onClose={closeAllPopups}
          onUpdateAvatar={handleUpdateAvatar} />
        <PopupWithForm name="delete-card" title="Вы уверены?" buttonName="Да" ariaLabel="Подтвердить" />
        <ImagePopup card={selectedCard} onClose={closeAllPopups} isOpen={isImagePopupOpen} />
        <InfoTooltip isOpen={isInfoTooltipOpen} picture={picture} message={message} onClose={closeAllPopups} />
      </div>
    </CurrentUserContext.Provider>
  );
}

export default App;
