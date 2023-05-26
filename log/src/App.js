import { useEffect, useState, useContext } from 'react';
import './App.css';
import { useJwt } from "react-jwt";
import { Context } from './Context';

function App() {
  const { isLogin, setIsLogin } = useContext(Context)
  const [value, setValue] = useState('')
  const [valuePass, setValuePass] = useState('')
  const [token, setToken] = useState('')

  useEffect(() => {
    const session = window.localStorage.getItem('session')
    if (session) {
      setToken(session)
      setIsLogin(true);
    }
  }, [])

  const { decodedToken, isExpired } = useJwt(token);

  const handleLogin = (event) => {
    event.preventDefault();
    const requestOptions = {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ username: value, password: valuePass })
    };
    const url = 'https://backend-login-puce.vercel.app/'
    fetch(url, requestOptions)
      .then(response => response.json())
      .then(data => {
        if (data.token) {
          setIsLogin(true);
          setToken(data.token);
          localStorage.setItem('session', data.token)
        }
      })
      .catch(error => {
        setIsLogin(false)
      });
    setValue('');
    setValuePass('');
  }

  function handleChange(event) {
    setValue(event.target.value);
  }

  function handleChangePass(event) {
    setValuePass(event.target.value);
  }

  function handleLogOut(event) {
    event.preventDefault();
    localStorage.removeItem('session');
    setIsLogin(false);
    window.location.reload();
  }
  return (
    <div className="login-page">
      <div className="form">
        <form className="login-form" onSubmit={(event) => handleLogin(event)}>
          {isLogin ? (
            <>
              <button onClick={handleLogOut}>Cerrar sesión</button>
              <p>Hola {decodedToken?.username}</p>
            </>
          ) : (
            <p>Logeate porfavor</p>
          )}
          <input value={value} onChange={handleChange} type="text" placeholder="username" />
          <input value={valuePass} onChange={handleChangePass} type="password" placeholder="password" />
          <button type='submit'>login</button>
          <p className="message">Not registered? <a href="#">Create an account</a></p>
        </form>
      </div>
    </div>
  );
}

export default App;