import React, { useState } from 'react';
import { Link } from 'react-router-dom';

function Register(props) {
  const [formValue, setFormValue] = useState({
    email: '',
    password: ''
  })

  function handleChange(e) {
    const {name, value} = e.target;

    setFormValue({
      ...formValue,
      [name]: value
    })
  }

  function handleSubmit(e) {
    e.preventDefault();
    
    props.handleRegister(formValue);
  }

  return (
    <>
      <div className="auth__container">
        <form className="auth__form" name="register" onSubmit={handleSubmit}>
          <h2 className="auth__title">Регистрация</h2>
          <input className="auth__input auth__input_type_email" id="email-input" type="text" name="email"
            placeholder="Email" value={formValue.email} minLength="" maxLength="" required
            title="" onChange={handleChange} />
          <input className="auth__input auth__input_type_password" id="password-input" type="password"
            name="password" placeholder="Пароль" value={formValue.password} minLength="" maxLength=""
            required title="" onChange={handleChange} />
          <button className="auth__submit-button" type="submit" aria-label="Зарегистрироваться">
            Зарегистрироваться
          </button>
        </form>
        <p className="auth__subtitle">Уже зарегистрированы? <Link className="auth__subtitle-link" to={props.linkTo}>Войти</Link></p>
      </div>
    </>
  )
}

export default Register;