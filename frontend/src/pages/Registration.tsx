import './Registration.scss'
import axios from "axios";
import { useState } from 'react';

const Registration = (props: any) => {
  const [registrationForm, setRegistrationForm] = useState({
    email: "",
    password: ""
  })
  const [responseMessage, setResponseMessage] = useState<string>('')

  const validateEmail = (email: string) => {
    // Regular expression for email validation
    const emailRegex = /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i;
    return emailRegex.test(email);
  };

  const submitRegistration = (event: any) => {
    if (!registrationForm.email || !registrationForm.password) return setResponseMessage('Vyplňte všechna pole!')
    if (!validateEmail(registrationForm.email)) return setResponseMessage('Neplatný formát emailu!')
    axios({
      method: "POST",
      url: "/registration",
      data: {
        email: registrationForm.email,
        password: registrationForm.password
      }
    })
      .then((response: any) => {
        console.log(response.data.message)  
        setResponseMessage(response.data.message)
      }).catch((error: any) => {
        if (error.response) {
          console.log(error.response)
          console.log(error.response.status)
          console.log(error.response.headers)
        }
      })

    setRegistrationForm(({
      email: "",
      password: ""
    }))

    event.preventDefault()
  }

  const handleChange = (event: any) => {
    const { value, name } = event.target
    setRegistrationForm((prevNote: any) => ({
      ...prevNote, [name]: value
    })
    )
  }

  return (
    <div className="registration-page">
      <div className="registration-window">
        <h1>Registrace</h1>
        <form>
          <div className='registration-input'>
            <label htmlFor="email-input">E-mail:</label>
            <input
              type="email"
              className='email-input'
              id='email-input'
              value={registrationForm.email}
              name='email'
              onChange={handleChange}
            />
          </div>
          <div className='registration-input'>
            <label htmlFor="password-input">Heslo:</label>
            <input
              type="password"
              className='password-input'
              id='password-input'
              value={registrationForm.password}
              name='password'
              onChange={handleChange}
            />
          </div>
          <span className='text-danger'>{responseMessage}</span>
          <div className='registration-other-options'>
            <a href='/login'>zpět na přihlášení</a>
            <a href="/forgotten-password">zapomenuté heslo</a>
          </div>
          <div className='registration-submit'>
            <button type='button' className='button btn-primary' onClick={submitRegistration}>Registrovat se</button>
          </div>
        </form>
      </div>
    </div>
  )
}
export default Registration;