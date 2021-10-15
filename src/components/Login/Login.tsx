import React, { ReactElement, useState } from 'react'
import { useHistory } from 'react-router-dom';
import { authApi } from '../../api/authApi';
import { ReactComponent as Brain } from '../../images/brain.svg'
import { ReactComponent as Logo } from '../../images/cortex_logo.svg'
import { useActions } from '../../redux/useActions';
import './login.css'

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

  const [messageError, setMessageError] = useState("");

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

  const loginForm = async ({ username, password }: ILogin) => {
    // console.log("intervalHour", intervalHour);
    console.log(`Start login fetch`)
    const token = await authApi.login(username, password);
    console.log(`token`, token)
    localStorage.setItem("token", token["access_token"]);
    console.log(`Stop login fetch`)
  }

  const handleSubmit = () => {
    try {
      login({
        password: form.password,
        username: form.username,
      });
      const now = new Date();
      localStorage['dateNow'] = ''+now.getTime();
      history.push('/queue');
      // setMessageError("");
    } catch (error: any) {
      const status = error.status;
      // setMessageError("Incorrect email or password");
      console.log(messageError);
      if (status === 401 || status === 403 || status === 404) {
        setMessageError("Incorrect email or password");
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
        <input type="email" value={form.username} onChange={handleEmailChange} className="login_input" placeholder="EMAIL" />
        <input type="password" value={form.password} onChange={handlePasswordChange} className="login_input" placeholder="PASSWORD" />
        <div className="errorMessage">{messageError}</div>
        <button onClick={handleSubmit}
          disabled={
            form.password === "" || form.username === ""
          } className="login_button">LOGIN</button>
      </form>
    </div>
  )
}
