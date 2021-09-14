import React, { ReactElement, useState } from 'react'
import { useHistory } from 'react-router-dom';
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

  const handleSubmit = () => {
    history.push('/queue')
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
