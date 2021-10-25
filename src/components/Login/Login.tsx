import React, { ReactElement, useState, useEffect } from 'react'
import './login.css'
import { useHistory } from 'react-router-dom';
import { ReactComponent as Brain } from '../../images/brain.svg'
import { ReactComponent as Logo } from '../../images/cortex_logo.svg'
import { useActions } from '../../redux/useActions';
import { useTypedSelector } from '../../redux/useTypeSelector';

export interface ILogin {
  username: string;
  password: string;
}

export default function Login(): ReactElement {
  const [ form, setForm ] = useState<ILogin>({
    username: "",
    password: "",
  });
  const history = useHistory();
  const { login } = useActions();

  const errorMessage = useTypedSelector((state) => state.auth.errorMessage);
  const isLogin = useTypedSelector((state) => state.auth.loggedIn);
  const isLoading = useTypedSelector((state) => state.auth.isLoading);

  const handleEmailChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setForm((prev) => {
      return { ...prev, username: e.target.value };
    });
  };

  const handlePasswordChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setForm((prev) => {
      return { ...prev, password: e.target.value };
    });
  };

  useEffect(() => {
    isLogin && history.push('/queue');
    setForm({
      username: "",
      password: "",
    });
  }, [isLogin, isLoading, errorMessage])

  const handleSubmit = (e: any) => {
    e.preventDefault();

    login({
        password: form.password,
        username: form.username,
      });
  };

  return (
    <div className="login">
      <div className="login_image">
        <Brain />
      </div>
      <div className="cortex_logo">
        <Logo />
      </div>
      { errorMessage.length > 0 &&
        <div className="alert alert-danger loginAlertError" role="alert">
            {errorMessage}
        </div>
      }
      <form className="login_form">
        <input type="email" value={form.username} onChange={handleEmailChange} className="login_input" placeholder="EMAIL" />
        <input type="password" value={form.password} onChange={handlePasswordChange} className="login_input" placeholder="PASSWORD" />
        {/* <div className="errorMessage"></div> */}
        <button onClick={handleSubmit}
          disabled={
          form.password === "" || form.username === "" || !isLoading
          } className="login_button">LOGIN</button>
      </form>
    </div>
  )
}
