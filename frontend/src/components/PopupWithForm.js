import React from 'react';

class PopupWithForm extends React.Component {
  constructor(props) {
    super(props)
  }

  render() {
    return (
      <div className={`popup popup_type_${this.props.name} ${this.props.isOpen && 'popup_opened'}`}>
        <div className="popup__container">
          <button className="popup__close-button" type="button"
            aria-label="Закрыть диалоговое окно" onClick={this.props.onClose}></button>
          <form className="popup__form" name={this.props.name} onSubmit={this.props.onSubmit}>
            <h2 className="popup__title">{this.props.title}</h2>
            {this.props.children}
            <button className="popup__submit-button" type="submit" aria-label={this.props.ariaLabel}>
              {this.props.buttonName}
            </button>
          </form>
        </div>
      </div>
    )
  }
}

export default PopupWithForm;