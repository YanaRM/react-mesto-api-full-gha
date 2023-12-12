import React, { useState } from 'react';

function Login(props) {
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

    // if (!formValue.email || !formValue.password) {
    //   return
    // }

    props.handleLogin(formValue);
    setFormValue({email: '', password: ''});
  }

  return (
    <>
      <div className="auth__container">
        <form className="auth__form" name="login" onSubmit={handleSubmit}>
          <h2 className="auth__title">Вход</h2>
          <input className="auth__input auth__input_type_email" id="email-input" type="text" name="email"
            placeholder="Email" value={formValue.email} minLength="" maxLength="" required
            title="" onChange={handleChange} />
          <input className="auth__input auth__input_type_password" id="password-input" type="password"
            name="password" placeholder="Пароль" value={formValue.password} minLength="" maxLength=""
            required title="" onChange={handleChange} />
          <button className="auth__submit-button" type="submit" aria-label="Войти">
            Войти
          </button>
        </form>
      </div>
    </>
  )
}

export default Login;