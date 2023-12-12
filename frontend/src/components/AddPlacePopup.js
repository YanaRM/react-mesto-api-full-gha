import React from 'react';
import PopupWithForm from './PopupWithForm';

function AddPlacePopup(props) {
  const [name, setName] = React.useState('');
  const [link, setLink] = React.useState('');

  function handleChangeName(evt) {
    setName(evt.target.value);
  }

  function handleChangeLink(evt) {
    setLink(evt.target.value)
  }

  function handleSubmit(e) {
    e.preventDefault();

    props.onAddPlace({
      name,
      link: link
    })
  }

  React.useEffect(() => {
    setName('');
    setLink('');
  }, [props.isOpen])

  return (
    <PopupWithForm
      name="add-cards"
      title="Новое место"
      buttonName="Сохранить"
      ariaLabel="Сохранить"
      isOpen={props.isOpen}
      onClose={props.onClose}
      onSubmit={handleSubmit}>
      <div className="popup__input-container">
        <input className="popup__input popup__input_type_place" id="place-name-input"
          type="text" name="name" placeholder="Название" onChange={handleChangeName} value={name}
          minLength="2" maxLength="30"
          required title="Количество символов должно быть не меньше двух и не больше сорока" />
        <span className="popup__input-error place-name-input-error"></span>
        <input className="popup__input popup__input_type_image-link" id="cards-link-input"
          type="url" name="link" placeholder="Ссылка на картинку" onChange={handleChangeLink} value={link}
          required title="Введите ссылку" />
        <span className="popup__input-error cards-link-input-error"></span>
      </div>
    </PopupWithForm>
  )
}

export default AddPlacePopup;