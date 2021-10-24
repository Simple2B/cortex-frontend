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
  const [error, setError] = useState(false);

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
    console.log(`token`, token);
    localStorage.setItem("token", token["access_token"]);
    console.log(`Stop login fetch`)
  }

  const handleSubmit = () => {
    try {
      login({
        password: form.password,
        username: form.username,
      });
      // setError(false);
      history.push('/queue');
      // setMessageError("");
    } catch (error: any) {
      const status = error.status;
      console.log("status ", status);
      setForm({
        username: "",
        password: "",
      });
      setError(true);
      setMessageError("Invalid login credentials. Please try again!");
      // setMessageError("Incorrect email or password");
      console.log(messageError);
      if (status === 401 || status === 403 || status === 404) {
        setError(true);
        setMessageError("Invalid login credentials. Please try again!");
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
      { error &&
        <div className="alert alert-danger loginAlertError" role="alert">
            {messageError}
        </div>
      }
      <form className="login_form">
        <input type="email" value={form.username} onChange={handleEmailChange} className="login_input" placeholder="EMAIL" />
        <input type="password" value={form.password} onChange={handlePasswordChange} className="login_input" placeholder="PASSWORD" />
        {/* <div className="errorMessage"></div> */}
        <button onClick={handleSubmit}
          disabled={
            form.password === "" || form.username === ""
          } className="login_button">LOGIN</button>
      </form>
    </div>
  )
}
