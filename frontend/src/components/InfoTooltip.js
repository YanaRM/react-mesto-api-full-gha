import React from 'react';

function InfoTooltip(props) {
  return (
    <div className={`popup popup_type_info-tooltip ${props.isOpen && 'popup_opened'}`}>
      <div className="popup__container popup__container_type_auth">
        <button className="popup__close-button" type="button"
          aria-label="Закрыть диалоговое окно" onClick={props.onClose} />
        <img className="popup__message-image" src={props.picture} alt="" />
        <p className="popup__register-message">{props.message}</p>
      </div>
    </div>
  )
}

export default InfoTooltip;