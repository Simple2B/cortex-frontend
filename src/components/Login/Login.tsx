import React, { ReactElement, useState } from 'react'
import { useHistory } from 'react-router-dom';
import { authApi } from '../../api/authApi';
import { ReactComponent as Brain } from '../../images/brain.svg'
import { ReactComponent as Logo } from '../../images/cortex_logo.svg'
import './login.css'

export interface ILogin {
  email: string;
  password: string;
}

export default function Login(): ReactElement {
  const [login, setLogin] = useState<ILogin>({
    email: "",
    password: "",
  });
  const history = useHistory();

  const handleEmailChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setLogin((prev) => {
      return { ...prev, email: e.target.value };
    });
  };

  const handlePasswordChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setLogin((prev) => {
      return { ...prev, password: e.target.value };
    });
  };

  const loginForm = async ({ email, password }: ILogin) => {
    console.log(`Start login fetch`)
    const token = await authApi.login(email, password);
    console.log(`token`, token)
    localStorage.setItem("token", token["access_token"]);
    console.log(`Stop login fetch`)

  }

  const handleSubmit = () => {
    try {
      loginForm({
        password: login.password,
        email: login.email,
      });
      history.push('/queue')
    } catch (error: any) {
      const status = error.status;
      if (status === 401 || status === 403 || status === 404) {
        localStorage.removeItem("token");
        return Promise.reject({
          message: false,
        });
      }
      // other error code (404, 500, etc): no need to log out
      return Promise.resolve();
    }
  };

  return (
    <div className="login">
      <div className="login_image">
        <Brain />
      </div>
      <div className="cortex_logo">
        <Logo />
      </div>
      <form className="login_form">
        <input type="email" value={login.email} onChange={handleEmailChange} className="login_input" placeholder="EMAIL" />
        <input type="password" value={login.password} onChange={handlePasswordChange} className="login_input" placeholder="PASSWORD" />
        <button onClick={handleSubmit}
          disabled={
            login.password === "" || login.email === ""
          } className="login_button">LOGIN</button>
      </form>
    </div>
  )
}
