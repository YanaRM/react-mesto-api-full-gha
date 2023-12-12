import React from 'react';

class ImagePopup extends React.Component {
  render() {
    return (
      <div className={`popup popup_type_photo ${this.props.isOpen && 'popup_opened'}`}>
        <div className="popup__photo-container">
          <button className="popup__close-button" type="button" aria-label="Закрыть диалоговое окно"
            onClick={this.props.onClose}></button>
          <img className="popup__photo" src={this.props.card.link} alt={this.props.card.name} />
          <p className="popup__photo-caption">{this.props.card.name}</p>
        </div>
      </div>
    )
  }
}

export default ImagePopup;