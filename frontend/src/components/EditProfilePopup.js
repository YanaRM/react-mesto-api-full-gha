import React from 'react';
import PopupWithForm from './PopupWithForm';
import { CurrentUserContext } from '../contexts/CurrentUserContext';

function EditProfilePopup(props) {
  const [name, setName] = React.useState('');
  const [description, setDescription] = React.useState('');

  const currentUser = React.useContext(CurrentUserContext);

  function handleChangeName(evt) {
    setName(evt.target.value);
  }

  function handleChangeDescription(evt) {
    setDescription(evt.target.value)
  }

  React.useEffect(() => {
    setName(currentUser.name);
    setDescription(currentUser.about);
  }, [currentUser, props.isOpen]);

  function handleSubmit(e) {
    e.preventDefault();

    props.onUpdateUser({
      name,
      about: description,
    });
  }

  return (
    <PopupWithForm
      name="edit-profile"
      title="Редактировать профиль"
      buttonName="Сохранить"
      ariaLabel="Сохранить"
      isOpen={props.isOpen}
      onClose={props.onClose}
      onSubmit={handleSubmit}>
      <div className="popup__input-container">
        <input className="popup__input popup__input_type_name"
          id="name-input" type="text" name="name" placeholder="Имя"
          value={name || ''} onChange={handleChangeName} minLength="2" maxLength="40"
          required title="Количество символов должно быть не меньше двух и не больше сорока" />
        <span className="popup__input-error name-input-error"></span>
        <input className="popup__input popup__input_type_profession"
          id="profession-input" type="text" name="about" placeholder="Профессия"
          value={description || ''} onChange={handleChangeDescription} minLength="2" maxLength="200"
          required title="Количество символов должно быть не меньше двух и не больше двухсот" />
        <span className="popup__input-error profession-input-error"></span>
      </div>
    </PopupWithForm>
  )
}

export default EditProfilePopup;