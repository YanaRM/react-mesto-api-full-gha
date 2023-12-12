import React from 'react';
import PopupWithForm from './PopupWithForm';

function EditAvatarPopup(props) {
  const [avatar, setAvatar] = React.useState('');
  const inputRef = React.useRef();

  function handleChange(evt) {
    setAvatar(evt.target.value);
  }

  function handleSubmit(e) {
    e.preventDefault();

    props.onUpdateAvatar({
      avatar: inputRef.current.value
    })
  }

  return (
    <PopupWithForm
      name="edit-avatar"
      title="Обновить аватар"
      buttonName="Сохранить"
      ariaLabel="Сохранить"
      isOpen={props.isOpen}
      onClose={props.onClose}
      onSubmit={handleSubmit}>
      <div className="popup__input-container">
        <input className="popup__input popup__input_type_avatar-link" id="avatar-link-input"
          type="url" name="avatar" placeholder="Ссылка на картинку" required
          title="Введите ссылку" onChange={handleChange} ref={inputRef} />
        <span className="popup__input-error avatar-link-input-error"></span>
      </div>
    </PopupWithForm>
  )
}

export default EditAvatarPopup;